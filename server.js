import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(json());
app.use(express.static('Public'));

const { EMAIL_USER, EMAIL_PASS, PORT } = process.env;

// Create the Nodemailer transporter
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

// Function to send emails with consistent JSON response
function sendEmail(mailOptions, res) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email send error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
}

// Route to send confirmation email to the user
app.post('/send', (req, res) => {
    const output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cerebrum Lux Inc.</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #06418f; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #fff; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { background: #086ad8; color: #ffffff; padding: 10px 20px; text-align: center; }
            .body { padding: 20px; line-height: 1.6; color: #555555; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header"><h2>Contact Info</h2></div>
            <div class="body">
                <p>Dear ${req.body.name},</p>
                <p>Thank you for contacting Cerebrum Lux Inc. We received your request and will respond shortly.</p>
                <p>Best regards,</p>
                <p>Admin Team<br>Cerebrum Lux Inc.</p>
            </div>
            <div class="footer"><p>This is an automated message. Please do not reply directly to this email.</p></div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
        from: '"Cerebrum Lux Inc." <support@cerebrumlux.com>',
        to: req.body.email,
        subject: 'Contact Information',
        html: output,
    };

    sendEmail(mailOptions, res);
});

// Route to notify admin of a new contact form submission
app.post('/receive', (req, res) => {
    const output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cerebrum Lux</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #fff; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { background: #086ad8; color: #ffffff; padding: 10px 20px; text-align: center; }
            .body { padding: 20px; line-height: 1.6; color: #555555; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header"><h2>Contact Info</h2></div>
            <div class="body">
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Phone:</strong> ${req.body.phone}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>
            </div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
        from: '"Cerebrum Lux" <support@cerebrumlux.com>',
        to: EMAIL_USER,
        subject: 'New Contact Request',
        html: output,
    };

    sendEmail(mailOptions, res);
});

// Route to notify admin of a new service request
app.post('/receiveRequest', (req, res) => {
    const output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cerebrum Lux</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 30px auto; background: #fff; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { background: #086ad8; color: #ffffff; padding: 10px 20px; text-align: center; }
            .body { padding: 20px; line-height: 1.6; color: #555555; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header"><h2>Contact Info</h2></div>
            <div class="body">
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Phone:</strong> ${req.body.phone}</p>
                <p><strong>Package:</strong> ${req.body.package}</p>
                <p><strong>Time:</strong> ${req.body.call}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>
            </div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
        from: '"Cerebrum Lux" <support@cerebrumlux.com>',
        to: EMAIL_USER,
        subject: `Inquiry for ${req.body.subject}`,
        html: output,
    };

    sendEmail(mailOptions, res);
});

// Middleware to handle 404 errors, should be placed after all route definitions
app.use((req, res) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
