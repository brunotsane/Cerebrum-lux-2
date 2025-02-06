import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(json());
app.use(express.json());
app.use(express.static('Public'));

const { EMAIL_USER, EMAIL_PASS, PORT, STRIPE_SECRET, WEBHOOK_SECRET } = process.env;
const stripe = new Stripe(STRIPE_SECRET);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
    const { name, email, packOption, campOption, comments } = req.body;

    const prices = {
        pro: 150000, // $300 in cents
        starter: 25000, // $200 in cents
    };

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: packOption === 'pro' ? 'Pro Package' : 'Starter Package',
                        },
                        unit_amount: prices[packOption],
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://www.cerebrumlux.com/success.html',
            cancel_url: 'https://www.cerebrumlux.com/cancel.html',
            metadata: {
                packageName: packOption === 'pro' ? 'Pro Package' : 'Starter Package',
                campOption: campOption,
                comments: comments || 'None',
            },
        });

        await sendRegistrationEmail(name, email, packOption, campOption, comments);
        res.redirect(303, session.url);
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Failed to create checkout session.' });
    }
});

app.post('/quiz-completed', async (req, res) => {
    const { name, email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Missing name or email' });
    }

    const mailOptions = {
        from: '"Cerebrum Lux Inc." <support@cerebrumlux.com>',
        to: email,
        subject: '🎉 Congratulations! Enjoy 25% Off Your Next Purchase!',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; }
                .container { max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
                h2 { color: #06418f; text-align: center; }
                p { font-size: 16px; text-align: center; }
                .discount { font-size: 20px; font-weight: bold; color: #d9534f; text-align: center; }
                .btn { display: block; width: 200px; margin: 20px auto; padding: 12px; background: #06418f; color: #f4f4f4; text-align: center; text-decoration: none; border-radius: 5px; }
                .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>🎉 Congrats, ${name}! You Did It! 🎉</h2>
                <p>Thanks for completing the quiz! As a reward, enjoy an exclusive <strong>25% discount</strong> on your next purchase.</p>
                <p>You have been entered into a draw for a free website design!</p>
                <p class="discount">Use Code: <strong>QUIZ25</strong></p>
                <a href="https://www.cerebrumlux.com/pricing.html" class="btn">Claim Your Discount</a>
                <p class="footer">Offer valid for 7 days. Terms and conditions apply.</p>
                <p>Contact us at +1 (888) 592-7276 if you have any special inquiry </p>
            </div>

            <p>===========================================================================================================================</p>

        <div class="container">
            <h2>🎉 Félicitations! Vous l'avez fait ! 🎉</h2>
            <p>Merci d'avoir complété le quiz ! En récompense, profitez d'une <strong>réduction exclusive de 25%</strong> sur votre prochain achat.</p>
            <p>Vous avez été inscrit à un tirage au sort pour un design de site web gratuit !</p>
            <p class="discount">Utilisez le code : <strong>QUIZ25</strong></p>
            <a href="https://www.cerebrumlux.com/pricing.html" class="btn">Réclamez votre réduction</a>
            <p class="footer">Offre valable pendant 7 jours. Des conditions s'appliquent.</p>
            <p>Contactez-nous au +1 (888) 592-7276 pour toute demande spéciale.</p>
        </div>

        </body>
        </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Discount email sent to ${email}`);
        res.status(200).json({ message: 'Discount email sent successfully!' });
    } catch (error) {
        console.error('Error sending discount email:', error);
        res.status(500).json({ error: 'Failed to send discount email' });
    }
});

// Webhook Route (uses raw body for Stripe)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const endpointSecret = WEBHOOK_SECRET;

    let event;
    let rawBody =  await buffer(req);
    try {
        const sig = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Extract customer details from the session
        const customerName = session.customer_details.name;
        const customerEmail = session.customer_details.email;
        const packageName = session.metadata.packageName || 'N/A';
        const campOption = session.metadata.campOption || 'N/A';
        const comments = session.metadata.comments || 'N/A';

        // Send confirmation email
        await sendRegistrationEmail(customerName, customerEmail, packageName, campOption, comments);
    }

    // Respond to Stripe to acknowledge receipt of the event
    res.status(200).json({ received: true });
});


// Function to Send Confirmation Email
const sendConfirmationEmail = async (name, email, packageType) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"Cerebrum Lux Inc." <support@cerebrumlux.com>',
        to: email,
        subject: 'Registration Confirmation',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                h2 { color: #06418f; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Thank You for Registering!</h2>
                <p>Hi ${name},</p>
                <p>You have successfully registered for the <strong>${packageType === 'pro' ? 'Pro Package' : 'Starter Package'}</strong> web development camp.</p>
                <p>We are excited to have you join us!</p>
                <p>If you have any questions, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>The Cerebrum Lux Team</p>
            </div>
        </body>
        </html>
        `,
    };

    await transporter.sendMail(mailOptions);
};

// Function: Send Registration Email
const sendRegistrationEmail = async (name, email, packOption, campOption, comments) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER, // Replace with your email
            pass: EMAIL_PASS, // Replace with your email password or app-specific password
        },
    });

    const mailOptions = {
        from: '"Web Dev Camp Registration" <support@cerebrumlux.com>',
        to: EMAIL_USER, // Replace with your email to receive form data
        subject: `New Registration: ${name}`,
        html: `
            <h2>New Registration Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Selected Package:</strong> ${packOption === 'pro' ? 'Pro Package ($300)' : 'Starter Package ($200)'}</p>
            <p><strong>Camp Option:</strong> ${campOption}</p>
            <p><strong>Additional Comments:</strong> ${comments || 'None'}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Registration email sent to ${email}`);
        await sendConfirmationEmail(name, email, packOption);
    } catch (error) {
        console.error('Error sending registration email:', error);
    }
};

// Route to handle form submission

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
