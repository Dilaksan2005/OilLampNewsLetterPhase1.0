const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware for handling JSON requests and enabling CORS
app.use(cors());
app.use(express.json()); // Replacing body-parser with express built-in method

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'mrn7king@gmail.com', // Your Gmail address
    pass: 'hzshmabvcutbvvof',  // Your Gmail App Password
  },
});

// POST route to handle sending email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  // Validate the email input
  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    // Send the email using nodemailer
    const info = await transporter.sendMail({
      from: '"Oil Lamp Newsletter" <mrn7king@gmail.com>',
      to: email,  
      subject: 'Welcome to Our Newsletter!',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #6A1B9A;
                color: white;
                text-align: center;
                padding: 20px;
                border-radius: 10px;
              }
              .header h2 {
                margin: 0;
                font-size: 2em;
              }
              .content {
                margin-top: 20px;
                font-size: 1.2em;
                text-align: center;
              }
              .cta-button {
                background-color: #FF4081;
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                font-size: 1.1em;
                border-radius: 5px;
                margin-top: 20px;
                display: inline-block;
                transition: background-color 0.3s;
              }
              .cta-button:hover {
                background-color: #F50057;
              }
              footer {
                margin-top: 30px;
                text-align: center;
                font-size: 0.9em;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Subscribing!</h2>
              </div>
              <div class="content">
                <p>We're excited to have you on board! You’ll be the first to know about our upcoming launch, exclusive offers, and exciting news.</p>
                <p>Stay tuned for more updates as we count down to our big day!</p>
                <a href="https://www.yourwebsite.com" class="cta-button">Visit Our Website</a>
              </div>
              <footer>
                <p>&copy; 2025 Oil Lamp Newsletter. All rights reserved.</p>
              </footer>
            </div>
          </body>
        </html>
      `
    });
    
    // Respond with a success message
    res.status(200).json({ message: 'Email sent successfully!', messageId: info.messageId });
    console.log("Email sent:", info.messageId);

  } catch (error) {
    // Handle errors and respond with failure message
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
