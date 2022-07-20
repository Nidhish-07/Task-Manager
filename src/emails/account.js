const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = function (email, name) {
  sgMail.send({
    to: email,
    from: "mymailfornidhish02@gmail.com",
    subject: "Thanks for joining us",
    text: `Welcome to the app, ${name}`,
  });
};

const sendCancelEmail = function (email, name) {
  sgMail.send({
    to: email,
    from: "mymailfornidhish02@gmail.com",
    subject: `Goodbye, ${name}`,
    text: "Is there anything we should have done to keep you?",
  });
};
module.exports = { sendWelcomeEmail, sendCancelEmail };
