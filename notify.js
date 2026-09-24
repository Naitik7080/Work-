const express = require("express");
const { sendPaymentEmail } = require("../services/email");

const router = express.Router();

// POST /api/notify-payment
// Called by the frontend after the user taps "I've Paid".
// NOTE: this is Phase 9 (email automation) only — it does NOT verify the
// payment. Real verification is Phase 8 (payment gateway webhook), which
// should call this same email function once it confirms the amount/order.
router.post("/notify-payment", async (req, res) => {
  const { orderId, name, mobile, custId, planName, amount } = req.body;

  if (!orderId || !name || !mobile || !planName || !amount) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  try {
    await sendPaymentEmail({
      orderId,
      name,
      mobile,
      custId,
      planName,
      amount,
      paymentStatus: "PENDING",
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
