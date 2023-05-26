import nodemailer from "nodemailer";

export interface MailInput {
name: string
email:string
subject: string
message: string
}

export const sendMail = async (data:MailInput, to: string) => {
    const { name, email, subject, message} = data

    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name} 👻" <${email}>`, // sender address
      to, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return info
}