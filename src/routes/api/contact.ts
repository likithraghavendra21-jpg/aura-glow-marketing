import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  business: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  service: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
});

const RECIPIENT = "pariyashu22@gmail.com";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Invalid input", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const { name, business, email, phone, service, message } = parsed.data;

        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
          console.error("Missing email credentials");
          return Response.json({ error: "Email service not configured" }, { status: 500 });
        }

        const esc = (s: string) =>
          s.replace(/[&<>"']/g, (c) =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
          );

        const html = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1f1a17;">
            <h2 style="margin:0 0 16px;color:#b45309;">New AuraMarketi enquiry</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;font-weight:600;width:130px;">Name</td><td>${esc(name)}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Business</td><td>${esc(business)}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Phone</td><td><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:600;">Service</td><td>${esc(service)}</td></tr>
            </table>
            <h3 style="margin:24px 0 8px;">Message</h3>
            <p style="white-space:pre-wrap;background:#fdf6ec;padding:16px;border-radius:8px;border:1px solid #f2e2c9;">${esc(message)}</p>
          </div>
        `;

        const resendRes = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "AuraMarketi <onboarding@resend.dev>",
            to: [RECIPIENT],
            reply_to: email,
            subject: `New enquiry from ${name} (${business})`,
            html,
          }),
        });

        if (!resendRes.ok) {
          const errBody = await resendRes.text();
          console.error(`Resend send failed [${resendRes.status}]: ${errBody}`);
          return Response.json(
            { error: "Failed to send email" },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
