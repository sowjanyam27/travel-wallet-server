require("dotenv").config();
const { Router } = require("express");
const nodemailer = require("nodemailer");
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/send", authMiddleware, async (request, response, next) => {
  console.log("send email?", request.body);
  const { name, message, toemaiIds } = request.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        //  the user MUST allow "Less secure app" AND disable two-step verification on Google Account
        user: process.env.EMAIL, // gmail
        pass: process.env.PASSWORD, // password
      },
    });

    let mail = {
      from: process.env.EMAIL, // user gmail
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
