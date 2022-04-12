const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  let transporter = nodemailer.createTransport({});
  // if the process.env.NODE_ENV is in development use mailtrap
  if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  // if the process.env.NODE_ENV is in production use gmail
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: process.env.SERVICE,

      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.PASS
      }
    });
  }

  // 2) Define the email options
  const mailOptions = {
    from: 'natours help <mendyrivkin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
