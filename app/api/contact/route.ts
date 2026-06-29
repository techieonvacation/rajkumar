import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/validators/contact";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email/templates";

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

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstMessage =
      parsed.error.errors[0]?.message ?? "Validation failed";
    return NextResponse.json(
      { error: firstMessage, fieldErrors },
      { status: 400 }
    );
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

    // Send emails in parallel — don't block the response if they fail
    await Promise.allSettled([
      sendContactNotification(contact),
      sendContactConfirmation(contact),
    ]);

    return NextResponse.json(
      { success: true, id: contact.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("[api/contact POST]", err);
    return NextResponse.json(
      { error: "Failed to submit your message. Please try again later." },
      { status: 500 }
    );
  }
}
