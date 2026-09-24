const nodemailer = require("nodemailer");

// Transporter is built lazily so a missing .env doesn't crash the whole
// server at boot — it only fails when someone actually tries to send.
function buildTransporter() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER / EMAIL_PASS not set. Fill them in backend/.env before sending emails."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // Gmail App Password, not the normal account password
    },
  });
}

/**
 * Sends the "New Wi-Fi Payment Received" notification to the admin.
 * order = { orderId, name, mobile, custId, planName, amount }
 */
async function sendPaymentEmail(order) {
  const { ADMIN_EMAIL, EMAIL_USER } = process.env;
  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL not set in backend/.env");
  }

  const transporter = buildTransporter();

  const html = `
    <h2>New Wi-Fi Payment Received</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Customer</b></td><td>${order.name}</td></tr>
      <tr><td><b>Mobile</b></td><td>${order.mobile}</td></tr>
      <tr><td><b>Customer ID</b></td><td>${order.custId || "-"}</td></tr>
      <tr><td><b>Plan</b></td><td>${order.planName}</td></tr>
      <tr><td><b>Amount</b></td><td>&#8377;${order.amount}</td></tr>
      <tr><td><b>Order ID</b></td><td>${order.orderId}</td></tr>
      <tr><td><b>Payment Status</b></td><td>${order.paymentStatus || "PENDING"}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: `"DeeTech Wi-Fi" <${EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Wi-Fi Payment Received - ${order.orderId}`,
    html,
  });
}

module.exports = { sendPaymentEmail };
