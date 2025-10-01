const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const sgMail = require("@sendgrid/mail");

console.log("ENV file:", path.resolve(process.cwd(), ".env"));
console.log(
  "SENDGRID_API_KEY prefix:",
  (process.env.SENDGRID_API_KEY || "").slice(0, 3)
);
console.log("SENDGRID_FROM:", process.env.SENDGRID_FROM);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  try {
    await sgMail.send({
      to: "kopyl10@gmail.com",
      from: process.env.SENDGRID_FROM,
      subject: "Test from SendGrid",
      text: "Hello! This is a SendGrid test.",
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Error sending email:", err.response?.body || err.message);
  }
}
main();
