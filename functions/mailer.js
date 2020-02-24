const nodemailer = require("nodemailer")

exports.sendEmail = ({
  to,
  from = "shwabler.com@gmail.com",
  subject,
  text = "",
  html = ""
}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.mail.ru",
  //   port: 465,
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "service@shwabler.com", // generated ethereal user
  //     pass: "lm389934YX" // generated ethereal password
  //   }
  // })

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shwabler.com@gmail.com", // generated ethereal user
      pass: "bigbrownoak" // generated ethereal password
    }
  })

  // send mail with defined transport object
  transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject: subject, // Subject line
    text, // plain text body
    html // html body
  })
}
