import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendNewsletterConfirmation } from "@/lib/email/templates";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().max(100).optional().or(z.literal("")),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed" },
      { status: 400 }
    );
  }

  const { email, name } = parsed.data;

  try {
    // Check for existing subscriber
    const existing = await prisma.subscriber.findUnique({
      where: { email },
      select: { id: true, status: true },
    });

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { success: true, alreadySubscribed: true },
          { status: 200 }
        );
      }

      // Re-activate an unsubscribed user
      await prisma.subscriber.update({
        where: { email },
        data: { status: "active", name: name ?? "" },
      });

      return NextResponse.json({ success: true, reactivated: true }, { status: 200 });
    }

    // New subscriber
    await prisma.subscriber.create({
      data: {
        email,
        name: name ?? "",
        status: "active",
      },
    });

    // Send welcome email — don't block response
    sendNewsletterConfirmation(email).catch((err) => {
      console.error("[api/newsletter] welcome email failed:", err);
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[api/newsletter POST]", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
