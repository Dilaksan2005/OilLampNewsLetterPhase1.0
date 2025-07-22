const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3000;
const path = require('path'); // Import path module

const YOUR_ABSOLUTE_BACKGROUND_IMAGE_URL = ''; // Replace with your absolute image URL
const YOUR_ABSOLUTE_WHATSAPP_ICON_URL = 'https://img.icons8.com/ios-filled/20/FFFFFF/whatsapp.png'; 
const YOUR_ABSOLUTE_INSTAGRAM_ICON_URL = 'https://img.icons8.com/ios-filled/20/FFFFFF/instagram-new.png'; 
const YOUR_ABSOLUTE_FACEBOOK_ICON_URL = 'https://img.icons8.com/ios-filled/20/FFFFFF/facebook-new.png';

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Serve all static files in the current root directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

app.post('/send-email', async (req, res) => {
  const { email, name } = req.body; // Assuming you might pass a name as well

  if (!email) {
    return res.status(400).json({ message: 'Email address is required' });
  }

  try {
    const info = await transporter.sendMail({
      from: '"Elegance Candles Newsletter" <info.elegancecandles@gmail.com>',
      to: email,
      subject: 'Welcome to Elegance Candles!',
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Elegance Candles - Newsletter</title>
          <style type="text/css">
            body { margin: 0; padding: 0; }
            table { border-collapse: collapse; }
            td { padding: 0; }
            img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
            a { text-decoration: none; } /* Default link color for social links will be handled by inline style */

            /* Responsive styles */
            @media screen and (max-width: 600px) {
              .inner-table { width: 90% !important; }
              .card-padding { padding: 20px !important; }
              .social-link {
                display: block !important;
                width: 100% !important;
                margin-bottom: 10px; /* Space between stacked social links */
                text-align: center;
              }
              .social-link:last-child {
                margin-bottom: 0;
              }
              .social-table td {
                display: block !important;
                width: 100% !important;
                padding: 5px 0 !important; /* Adjust padding for stacked links */
              }
              .brand-text { font-size: 2rem !important; padding-top: 1.5rem !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000;">
          <div style="background-color: #000000; background-image: url('${YOUR_ABSOLUTE_BACKGROUND_IMAGE_URL}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: rgba(0, 0, 0, 0.7); min-height: 100vh;">
              <tr>
                <td align="center" valign="top" style="padding: 0 0 40px 0;">
                  <table class="inner-table" align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 600px; max-width: 600px;">
                    <tr>
                      <td align="center" style="padding: 40px 0 30px 0;">
                        <h1 class="brand-text" style="color: white; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 40px; text-align: center; text-shadow: 0 2px 6px rgba(0,0,0,0.7); margin: 0;">Elegance Candles</h1>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: rgba(255, 255, 255, 0.94); border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.25); color: #333333;">
                          <tr>
                            <td class="card-padding" style="padding: 30px;">
                              <h2 style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 24px; margin-bottom: 15px; text-align: center;">Hello, <span style="color: #DAA520; font-weight: 600;">${name}</span>!</h2>
                              <p style="margin: 0 0 15px 0; text-align: center; line-height: 1.5; font-family: 'Inter', Arial, sans-serif;">
                                Thank you for subscribing to our newsletter at <span style="color: #DAA520; font-weight: 600;">${email}</span>.<br/>
                                We're thrilled to have you join us in this journey with Elegance Candles!
                              </p>
                              <p style="margin: 0 0 15px 0; text-align: center; line-height: 1.5; font-family: 'Inter', Arial, sans-serif;">
                                You'll be the first to receive exclusive updates, new product launches, and special offers from Elegance Candles.
                              </p>
                              <div style="text-align: center; margin-top: 30px; color: #333333;">
                                <p style="font-weight: 500; font-size: 18px; margin-bottom: 5px; margin-top: 0; font-family: 'Inter', Arial, sans-serif;">Warmly,</p>
                                <p style="font-size: 18px; margin-top: 0; margin-bottom: 0; font-family: 'Inter', Arial, sans-serif;">The Elegance Candles Team</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <table class="social-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(218, 165, 32, 0.15); border-radius: 12px; padding: 50pxpx 0; box-shadow: 0 4px 30px rgba(218, 165, 32, 0.1); user-select: none;">
                          <tr>
                            <td align="center" style="padding: 10px;">
                              <a href="" target="_blank" style="color: #FFFFFF; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; transition: all 0.2s ease;">
                                <img src="${YOUR_ABSOLUTE_WHATSAPP_ICON_URL}" alt="WhatsApp Icon" style="width: 20px; height: 20px; vertical-align: middle;" /> WhatsApp Us
                              </a>
                            </td>
                            <td align="center" style="padding: 10px;">
                              <a href="" target="_blank" style="color: #FFFFFF; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; transition: all 0.2s ease;">
                                <img src="${YOUR_ABSOLUTE_INSTAGRAM_ICON_URL}" alt="Instagram Icon" style="width: 20px; height: 20px; vertical-align: middle;" /> Follow on Instagram
                              </a>
                            </td>
                            <td align="center" style="padding: 10px;">
                              <a href="" target="_blank" style="color: #FFFFFF; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; transition: all 0.2s ease;">
                                <img src="${YOUR_ABSOLUTE_FACEBOOK_ICON_URL}" alt="Facebook Icon" style="width: 20px; height: 20px; vertical-align: middle;" /> Connect on Facebook
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding: 10px 10px 30px 10px; font-size: 12px; color: #CCCCCC; text-align: center; font-family: 'Inter', Arial, sans-serif;">
                        <p style="margin: 5px 0;">You are receiving this email because you subscribed to the Elegance Candles newsletter.</p>
                        <p style="margin: 5px 0;">&copy;2025 Elegance Candles. All rights reserved.</p>
                        <p style="margin: 5px 0;">This is an automated message.</p>
                      </td>
                    </tr>

                  </table>
                  </td>
              </tr>
            </table>
            </div>
        </body>
        </html>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!', messageId: info.messageId });
    console.log("Email sent:", info.messageId);

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});