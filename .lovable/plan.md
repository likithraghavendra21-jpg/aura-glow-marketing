## Plan: Deliver contact form submissions by email (Resend)

Right now the contact form on the home page only shows a success animation — nothing is sent anywhere, which is why you don't see the details. I'll wire it up so every submission is emailed to **pariyashu22@gmail.com** via Resend.

### Steps
1. **Connect Resend** using the standard Resend connector (you'll approve the connection). This gives the app a `RESEND_API_KEY` and access to the Lovable connector gateway — no manual key handling.
2. **Create a server route** at `src/routes/api/contact.ts` that:
   - Accepts POST with `{ name, email, phone, message }`
   - Validates input (basic length/format checks, required fields)
   - Sends an email to `pariyashu22@gmail.com` via the Resend gateway, using `onboarding@resend.dev` as the From address (works immediately without a verified domain; replies go to the visitor's email via `reply_to`)
   - Returns `{ ok: true }` or a proper error status
3. **Update the contact form** in `src/routes/index.tsx` to POST to `/api/contact` on submit, show the existing success animation only after a 200 response, and display an inline error message if the send fails.

### Notes
- Using `onboarding@resend.dev` as sender is fine for receiving submissions at your own inbox. If you later want emails to come from your own domain (e.g. `contact@auramarketi.com`), you'd verify that domain in Resend — happy to add that as a follow-up.
- No database, no Google Form needed. Submissions land directly in your Gmail inbox.
