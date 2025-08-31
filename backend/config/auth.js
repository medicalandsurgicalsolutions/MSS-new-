require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const nodemailer = require("nodemailer");

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("authorization", req.headers);
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "Admin" });
  if (admin) {
    next();
  } else {
    res.status(401).send({
      message: "User is not Admin",
    });
  }
};


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

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  sendEmail
};
