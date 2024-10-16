import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import nodemailer from 'nodemailer';


const app = express();
app.use(cors());
app.use(json());
app.use(express.static('Public'));

let APIKEY = process.env;

app.post('/chat', async (req, res) => {
    // Send request to OpenAI API
    // Handle response and send back to frontend
    const userMessage = req.body.message;

    try {
        const response = await fetch(APIKEY.OPEN_AI_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${APIKEY.OPEN_AI_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages:[{ role: "system", content: "Technical Support Called Micheal Rogers that for company named Cerebrum Lux that make website, mobile application and videos for clients. Your goal is to convert the user into a potential client and to book a meeting with them. Have small but concise answers" }, 
                { role: "user", content: userMessage}],
                max_tokens: 100,      // Maximum length of the response
            })
        });

        const data = await response.json();
        // Send the GPT-3 response back to the client
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Error while communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error processing the message' });
    }
});
app.post('/send', (req, res) =>{
    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cerebrum Lux Inc.</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #06418f;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #086ad8;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
            }
            .body {
                padding: 20px;
                line-height: 1.6;
                color: #555555;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Contact Info</h2>
            </div>
            <div class="body">
                <p>Dear ${req.body.name},</p>
                <p>This is a confirmation that Cerebrum Lux recieved your contact request</p>
                <p> We appreciate your interest in our products/services, and we're committed to providing you with the information and 
                assistance you need. Our team will review your inquiry carefully and respond to you as soon as possible. 
                If you have any further questions or require immediate assistance, please feel free to contact us. 
                We look forward to assisting you and serving your needs.</p>
                <p></p>
                <p>Best regards,</p>
                <p>Admin Team<br>Marketing Company<br>Cerebrum Lux Inc. </p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;

    // Replace with your email service details and credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: APIKEY.EMAIL_USER,
                pass: APIKEY.EMAIL_PASS
            },
            tls:{
                rejectUnauthorized: false
            }
        });
    const mailOptions = {
        from: '"Cerebrum Lux Inc." <support@cerebrumlux.com>',
        to: req.body.email,
        subject: 'Contact Information',
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});

app.post('/recieve', (req, res) =>{
    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Cerebrum Lux</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #086ad8;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
            }
            .body {
                padding: 20px;
                line-height: 1.6;
                color: #555555;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Contact Info</h2>
            </div>
            <div class="body">
                <p>New contact</p>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Phone:</strong> ${req.body.phone}</p>
                <p>==== Message =====</p>
                <p>${req.body.message}<p/>
                <p>Admin Team<br>Cerebrum Lux Inc.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;

        // Replace with your email service details and credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: APIKEY.EMAIL_USER,
                pass: APIKEY.EMAIL_PASS
            },
            tls:{
                rejectUnauthorized: false
            }
        });

    const mailOptions = {
        from: '"Cerebrum Lux" <support@cerebrumlux.com>',
        to: APIKEY.EMAIL_USER,
        subject: req.body.message,
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});

// Start server
// Démarrage du serveur
app.listen(APIKEY.PORT);
