const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const sendEmail = async (body, res, message) => {
  try {
    // Create a transporter object with your SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,   // SMTP server address (ex: smtp.gmail.com)
      port: process.env.EMAIL_PORT,   // SMTP port (ex: 587)
      secure: false,                 // True for 465, false for other ports (587, 25)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: body.from,   // Sender address
      to: body.to,       // Receiver email
      subject: body.subject, // Subject line
      html: body.html,   // HTML body
    });

    // If the email is sent successfully, return success response
    return res.status(200).send({ message });
  } catch (error) {
    // If there's an error, return the error message
    return res.status(500).send({ message: `Error sending email: ${error.message}` });
  }
};
//limit email verification and forget password
const minutes = 30;
const emailVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const passwordVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

const supportMessageLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

module.exports = {
  sendEmail,
  emailVerificationLimit,
  passwordVerificationLimit,
  supportMessageLimit,
};
