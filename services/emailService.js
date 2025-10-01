require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_FROM, BASE_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

async function sendVerificationEmail(email, token) {
  const verifyUrl = `${BASE_URL}/users/verify/${token}`;
  await sgMail.send({
    to: email,
    from: SENDGRID_FROM,
    subject: "Verify your email",
    text: `Please verify your email: ${verifyUrl}`,
    html: `<p>Please verify your email:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });
}

module.exports = { sendVerificationEmail };
