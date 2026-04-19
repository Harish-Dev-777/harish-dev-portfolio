"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Resend } from "resend";

export const sendNotification = internalAction({
  args: {
    messageId: v.id("messages"),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.string(),
    budget: v.optional(v.string()),
    phone: v.string(),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailHtml = buildEmailTemplate({
      name: args.name,
      email: args.email,
      company: args.company,
      service: args.service,
      budget: args.budget,
      phone: args.phone,
      details: args.details,
    });

    try {
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["harishmkdev@gmail.com"],
        subject: `🚀 New Project Inquiry from ${args.name}`,
        html: emailHtml,
        replyTo: args.email,
      });

      // Mark as sent
      await ctx.runMutation(internal.emailsHelper.updateEmailStatus, {
        messageId: args.messageId,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      // The data is already stored in Convex, so it's not lost
    }
  },
});

// ─── Email Template ────────────────────────────────────────────────
interface EmailData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  phone: string;
  details?: string;
}

function buildEmailTemplate(data: EmailData): string {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const firstName = data.name.split(" ")[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, div, p, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;padding:40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" max-width="600" style="max-width:600px;background-color:#0a0a0a;border:1px solid #1a1a1a;border-radius:32px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.5);">
          
          <!-- Header Branding -->
          <tr>
            <td style="padding:60px 50px 40px;background:linear-gradient(180deg, #111111 0%, #0a0a0a 100%);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background-color:rgba(249,115,22,0.1);color:#f97316;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:2px;padding:6px 14px;border-radius:100px;margin-bottom:24px;">Project Inquiry</div>
                    <h1 style="margin:0;font-size:42px;line-height:1.1;font-weight:900;color:#ffffff;letter-spacing:-2px;">
                      ${data.name}
                    </h1>
                    <p style="margin:12px 0 0;font-size:16px;color:#737373;font-weight:400;">${date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information Grid -->
          <tr>
            <td style="padding:0 50px 40px;">
              <div style="background-color:#111111;border:1px solid #1f1f1f;border-radius:24px;padding:32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom:30px;width:50%;">
                      <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">Email</div>
                      <a href="mailto:${data.email}" style="font-size:18px;color:#ffffff;text-decoration:none;font-weight:600;">${data.email}</a>
                    </td>
                    <td style="padding-bottom:30px;width:50%;">
                      <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">Phone</div>
                      <a href="tel:${data.phone}" style="font-size:18px;color:#ffffff;text-decoration:none;font-weight:600;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:20px;width:50%;border-top:1px solid #1f1f1f;">
                      <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">Service</div>
                      <div style="font-size:18px;color:#f97316;font-weight:700;">${data.service}</div>
                    </td>
                    <td style="padding-top:20px;width:50%;border-top:1px solid #1f1f1f;">
                      <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">Company</div>
                      <div style="font-size:18px;color:#ffffff;font-weight:600;">${data.company || "Personal"}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          ${data.budget ? `
          <!-- Budget Section -->
          <tr>
            <td style="padding:0 50px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:12px;">Budget Estimation</div>
                    <div style="display:inline-block;padding:12px 24px;background-color:#1a1a1a;border-radius:12px;color:#f97316;font-size:20px;font-weight:800;border:1px solid #262626;">
                      ${data.budget}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ""}

          ${data.details ? `
          <!-- Message Section -->
          <tr>
            <td style="padding:0 50px 50px;">
              <div style="font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:16px;">Message Overview</div>
              <div style="font-size:20px;line-height:1.7;color:#d4d4d4;font-weight:400;background-color:#111111;padding:40px;border-radius:24px;border:1px solid #1f1f1f;">
                ${data.details.replace(/\n/g, '<br/>')}
              </div>
            </td>
          </tr>
          ` : ""}

          <!-- CTA Section -->
          <tr>
            <td style="padding:0 50px 70px;" align="center">
              <a href="mailto:${data.email}?subject=RE: Your Project Inquiry&body=Hi ${firstName},%0D%0A%0D%0AThank you for reaching out..." 
                 style="display:inline-block;background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);color:#ffffff;text-decoration:none;font-size:18px;font-weight:700;padding:22px 60px;border-radius:100px;box-shadow: 0 10px 40px rgba(249,115,22,0.3);">
                Reply to ${firstName}
              </a>
              <p style="margin:24px 0 0;font-size:14px;color:#525252;">Click above to quickly draft a response</p>
            </td>
          </tr>

          <!-- Footer Branding -->
          <tr>
            <td style="padding:40px 50px;background-color:#050505;border-top:1px solid #141414;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size:14px;color:#404040;line-height:1.5;">
                    <strong style="color:#737373;">Harish Dev Portfolio</strong><br/>
                    A premium digital experience automated system.<br/>
                    Confidential Submission via Portfolio Contact System.
                  </td>
                  <td align="right" valign="bottom" style="font-size:24px;color:#f97316;opacity:0.3;">
                    ✦
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        
        <!-- Bottom Compliance/Spacer -->
        <table role="presentation" width="600" style="width:600px;">
          <tr>
            <td style="padding:30px 0;text-align:center;font-size:12px;color:#404040;letter-spacing:1px;text-transform:uppercase;">
              &copy; ${new Date().getFullYear()} Harish. All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
