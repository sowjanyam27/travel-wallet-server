require("dotenv").config();
const { Router } = require("express");
const nodemailer = require("nodemailer");
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/send", authMiddleware, async (request, response, next) => {
  console.log("send email?", request.body);
  const { name, message, toemaiIds } = request.body;

  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        // in order for this to work, the user MUST allow "Less secure app" AND disable two-step verification on Google Account
        user: process.env.EMAIL, // gmail
        pass: process.env.PASSWORD, // password
      },
    });

    let mail = {
      from: "travelgeeks2020@gmail.com", // user gmail
      to: `${toemaiIds}`, // destination
      subject: "Summary of the Group trip",
      text: `${message}`,
    };

    // console.log("mail", mail);

    transporter.sendMail(mail, function (error, data) {
      if (error) {
        console.log("error:", error);
        response.json({
          msg: "fail",
        });
      } else {
        response.json({
          msg: "Success",
        });
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
