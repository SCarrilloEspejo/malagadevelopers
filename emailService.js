"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

function sendMail(myObject){
  // Definimos el transporter
  console.info(myObject);
  var transporter = nodemailer.createTransport({
    host: "mail.orelito.com",
    port: 587,
    
    auth: {
      user: 'info@malagadevelopers.es',
      pass: 'M@rtina14052018Developers'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  // Definimos el email
  var mailOptions = {
    from: 'info@malagadevelopers.es',
    to: myObject.to,
    subject: myObject.subject,
    html: myObject.message
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return ({code:500, body: error.message});
    } else {
      console.log("Email sent");
      return ({code: 200, body: info});
    }
  });
}

exports.sendMail = sendMail;
