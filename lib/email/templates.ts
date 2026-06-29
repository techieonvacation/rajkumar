import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "noreply@rajeshkumar.com";
const TO = process.env.EMAIL_TO ?? "contact@rajeshkumar.com";
const SITE_NAME = "Rajesh Kumar — India-China Business Consultant";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  subject?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt?: Date;
}

// ── Shared HTML helpers ────────────────────────────────────────────────────────

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${SITE_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:32px 40px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${SITE_NAME}</p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">India-China Business Bridge</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f9;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                &copy; ${new Date().getFullYear()} Rajesh Kumar &bull;
                <a href="${BASE_URL}" style="color:#2563eb;text-decoration:none;">rajeshkumar.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function field(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:6px 0;font-size:13px;color:#6b7280;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;color:#111827;vertical-align:top;">${value}</td>
    </tr>`;
}

// ── 1. Admin notification ─────────────────────────────────────────────────────

export async function sendContactNotification(
  contact: ContactRecord
): Promise<void> {
  const body = emailWrapper(`
    <h2 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#111827;">New Contact Inquiry</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>

    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <tbody>
        ${field("Name", contact.name)}
        ${field("Email", contact.email)}
        ${field("Phone", contact.phone)}
        ${field("Company", contact.company)}
        ${field("Country", contact.country)}
        ${field("Service", contact.service)}
        ${field("Budget", contact.budget)}
      </tbody>
    </table>

    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151;text-transform:uppercase;letter-spacing:.5px;">Message</p>
    <div style="background:#f8f9fa;border-left:4px solid #2563eb;padding:16px 20px;border-radius:0 8px 8px 0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${contact.message}</div>

    <div style="margin-top:28px;text-align:center;">
      <a href="mailto:${contact.email}"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
        Reply to ${contact.name}
      </a>
    </div>
  `);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: contact.email,
    subject: `New Inquiry from ${contact.name}${contact.company ? ` (${contact.company})` : ""}`,
    html: body,
    text: [
      `New Contact Inquiry`,
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      contact.phone ? `Phone: ${contact.phone}` : "",
      contact.company ? `Company: ${contact.company}` : "",
      contact.country ? `Country: ${contact.country}` : "",
      contact.service ? `Service: ${contact.service}` : "",
      contact.budget ? `Budget: ${contact.budget}` : "",
      `\nMessage:\n${contact.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[email] sendContactNotification failed:", error);
    throw new Error(`Failed to send notification email: ${error.message}`);
  }
}

// ── 2. User confirmation ──────────────────────────────────────────────────────

export async function sendContactConfirmation(
  contact: ContactRecord
): Promise<void> {
  const body = emailWrapper(`
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Thank you, ${contact.name}!</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
      Your message has been received. I personally review every inquiry and typically respond within <strong>24–48 hours</strong> during business days.
    </p>

    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#1e40af;text-transform:uppercase;letter-spacing:.5px;">Your Message Summary</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        <tbody>
          ${field("Service", contact.service)}
          ${field("Budget", contact.budget)}
        </tbody>
      </table>
      <p style="margin:12px 0 0;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap;">${contact.message.length > 300 ? contact.message.slice(0, 300) + "…" : contact.message}</p>
    </div>

    <p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.7;">
      If your inquiry is urgent, feel free to reach out directly via WhatsApp or schedule a free discovery call using the button below.
    </p>

    <div style="margin-top:28px;text-align:center;">
      <a href="${BASE_URL}/contact"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
        Schedule a Call
      </a>
    </div>
  `);

  const { error } = await resend.emails.send({
    from: FROM,
    to: contact.email,
    subject: `We received your message — Rajesh Kumar`,
    html: body,
    text: [
      `Thank you, ${contact.name}!`,
      ``,
      `Your message has been received. I personally review every inquiry and typically respond within 24-48 hours during business days.`,
      ``,
      contact.service ? `Service of interest: ${contact.service}` : "",
      contact.budget ? `Budget range: ${contact.budget}` : "",
      ``,
      `Your message:`,
      contact.message,
      ``,
      `If urgent, schedule a call at: ${BASE_URL}/contact`,
    ]
      .filter((line) => line !== undefined)
      .join("\n"),
  });

  if (error) {
    console.error("[email] sendContactConfirmation failed:", error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
}

// ── 3. Newsletter welcome ─────────────────────────────────────────────────────

export async function sendNewsletterConfirmation(email: string): Promise<void> {
  const body = emailWrapper(`
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">You're subscribed!</h2>
    <p style="margin:0 0 20px;font-size:15px;color:#6b7280;line-height:1.6;">
      Welcome to the <strong>Rajesh Kumar</strong> newsletter — your source for curated insights on India-China trade, cross-border investment, and Asian market strategies.
    </p>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#166534;text-transform:uppercase;letter-spacing:.5px;">What to expect</p>
      <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:1.9;">
        <li>Monthly India-China business trend reports</li>
        <li>Regulatory updates &amp; policy analysis</li>
        <li>Exclusive case studies and market entry insights</li>
        <li>Event recaps and upcoming speaking appearances</li>
      </ul>
    </div>

    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.7;">
      In the meantime, explore the latest insights on my website.
    </p>

    <div style="text-align:center;">
      <a href="${BASE_URL}/blog"
         style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
        Read Latest Insights
      </a>
    </div>

    <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
      You subscribed with: ${email} &bull;
      <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color:#6b7280;">Unsubscribe</a>
    </p>
  `);

  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to Rajesh Kumar's Newsletter`,
    html: body,
    text: [
      `You're subscribed!`,
      ``,
      `Welcome to the Rajesh Kumar newsletter — your source for curated insights on India-China trade, cross-border investment, and Asian market strategies.`,
      ``,
      `What to expect:`,
      `• Monthly India-China business trend reports`,
      `• Regulatory updates & policy analysis`,
      `• Exclusive case studies and market entry insights`,
      `• Event recaps and upcoming speaking appearances`,
      ``,
      `Read the latest insights: ${BASE_URL}/blog`,
      ``,
      `Unsubscribe: ${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
    ].join("\n"),
  });

  if (error) {
    console.error("[email] sendNewsletterConfirmation failed:", error);
    throw new Error(`Failed to send newsletter confirmation: ${error.message}`);
  }
}
