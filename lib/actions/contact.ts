"use server";

import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";
import {
  sendContactNotification,
  sendContactConfirmation,
  sendNewsletterConfirmation,
} from "@/lib/email/templates";

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

// ── Submit contact form ────────────────────────────────────────────────────────

export async function submitContact(
  formData: ContactFormValues
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid form data";
    return { success: false, error: firstError };
  }

  const { name, email, phone, company, country, service, budget, message } =
    parsed.data;

  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone ?? "",
        company: company ?? "",
        country: country ?? "",
        service: service ?? "",
        budget: budget ?? "",
        message,
        status: "new",
      },
    });

    // Fire-and-forget emails — don't let email failures block the user response
    Promise.allSettled([
      sendContactNotification(contact),
      sendContactConfirmation(contact),
    ]).catch((err) => {
      console.error("[submitContact] email dispatch error:", err);
    });

    return { success: true };
  } catch (err) {
    console.error("[submitContact]", err);
    return {
      success: false,
      error: "Failed to send your message. Please try again shortly.",
    };
  }
}

/**
 * @deprecated Use `submitContact` instead.
 * Kept for backward compatibility with any existing form components.
 */
export async function submitContactForm(
  data: ContactFormValues
): Promise<ContactActionResult> {
  return submitContact(data);
}

// ── Subscribe to newsletter ────────────────────────────────────────────────────

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().max(100).optional().or(z.literal("")),
});

export type NewsletterActionResult =
  | { success: true; alreadySubscribed?: boolean }
  | { success: false; error: string };

export async function subscribeNewsletter(
  email: string,
  name?: string
): Promise<NewsletterActionResult> {
  const parsed = newsletterSchema.safeParse({ email, name });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid email address",
    };
  }

  try {
    const existing = await prisma.subscriber.findUnique({
      where: { email: parsed.data.email },
      select: { id: true, status: true },
    });

    if (existing) {
      if (existing.status === "active") {
        return { success: true, alreadySubscribed: true };
      }

      await prisma.subscriber.update({
        where: { email: parsed.data.email },
        data: { status: "active", name: parsed.data.name ?? "" },
      });

      return { success: true };
    }

    await prisma.subscriber.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name ?? "",
        status: "active",
      },
    });

    sendNewsletterConfirmation(parsed.data.email).catch((err) => {
      console.error("[subscribeNewsletter] email error:", err);
    });

    return { success: true };
  } catch (err) {
    console.error("[subscribeNewsletter]", err);
    return {
      success: false,
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
