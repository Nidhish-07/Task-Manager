const sgMail = require("@sendgrid/mail");

const sendGridAPIKey =
  "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";

sgMail.setApiKey(sendGridAPIKey);

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
