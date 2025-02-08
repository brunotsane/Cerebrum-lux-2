import nodemailer from 'nodemailer';
import 'dotenv/config';

const { EMAIL_USER, EMAIL_PASS, COMPANY_EMAIL } = process.env;

// ✅ Set up Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// ✅ Test Email
const testMailOptions = {
    from: `"Test Email" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: "Test Email from Node.js",
    text: "If you receive this, Nodemailer is working!",
};

transporter.sendMail(testMailOptions, (error, info) => {
    if (error) {
        console.error("❌ Email send failed:", error);
    } else {
        console.log("✅ Email sent successfully:", info.response);
    }
});
