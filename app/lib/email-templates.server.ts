export function getContactEmailHtml(name: string, email: string, message: string) {
  const currentYear = new Date().getFullYear();
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
          }
          .header {
            background-color: #4f46e5;
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 32px;
          }
          .field {
            margin-bottom: 24px;
          }
          .label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6b7280;
            margin-bottom: 4px;
          }
          .value {
            font-size: 16px;
            color: #111827;
            background: #f3f4f6;
            padding: 12px;
            border-radius: 6px;
            word-break: break-word;
          }
          .message-box {
            background: #f9fafb;
            border-left: 4px solid #4f46e5;
            padding: 16px;
            font-style: italic;
            color: #374151;
            margin-top: 8px;
          }
          .footer {
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            border-top: 1px solid #f3f4f6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Message Received</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Message Content</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <div class="footer">
            &copy; ${currentYear} Unathi Tshuma Portfolio • Sent via Resend
          </div>
        </div>
      </body>
    </html>
  `;
}
