const nodemailer = require("nodemailer");

// Send email notification
exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: "Failed to send email. Please try again." });
    }
};
