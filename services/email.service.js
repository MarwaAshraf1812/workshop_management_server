const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  async sendEmail(to, subject, text) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text,
      })
      console.log("Email sent successfully")
    } catch (error) {
      console.log("Error sending email", error)
    }
  }
}

module.exports = EmailService;