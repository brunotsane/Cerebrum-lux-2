import express, { json } from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import nodemailer from 'nodemailer';


const app = express();
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
        <title>Meeting Confirmation</title>
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
                <h2>Meeting Confirmation</h2>
            </div>
            <div class="body">
                <p>Dear ${req.body.name},</p>
                <p>This is a confirmation for our upcoming meeting. Please find the details below:</p>
                <p><strong>Date:</strong> ${req.body.date}</p>
                <p><strong>Time:</strong> ${req.body.time}</p>
                <p><strong>Location:</strong> Via Zoom</p>
                <p><strong>Agenda:</strong> Online Meeting</p>
                <p>Please let me know if you have any questions or if there are any changes to the schedule. Looking forward to our meeting.</p>
                <p>Best regards,</p>
                <p>Admin Team<br>Tech Company<br>Cerebrum Lux</p>
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
        from: '"Cerebrum Lux" <admin-supports@cerebrumlux.com>',
        to: req.body.email,
        subject: 'Meeting Confirmation',
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
