const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
exports.processPayment = async (req, res) => {
    const { amount, currency, source } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: source,
            confirmation_method: "manual",
            confirm: true,
        });
        res.json({ success: true, payment });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ error: "Payment failed. Please try again." });
    }
};
