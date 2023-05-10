require('dotenv').config()
import nodemailer from 'nodemailer'
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secureConnection: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"DangHoangKha 👻" <danghoangkha2006@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh Online trên BookingcareClone by HoangKha</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên chính xác, vui lòng click vào đường link bên dưới để hoàn thành thủ tục đăng ký lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click Here</a> 
        </div>
        <div>Xin chân thành cảm ơn!!!</div>
        `
    }


    if (dataSend.language === 'en') {
        result = `
        <h3>Hello ${dataSend.patientName}</h3>
         <p>You received this email because you booked an online medical appointment on BookingcareClone by HoangKha</p>
         <p>Information to book an appointment:</p>
         <div><b>Time: ${dataSend.time}</b></div>
         <div><b>Doctor: ${dataSend.doctorName}</b></div>
         <p>If the above information is correct, please click on the link below to complete the registration procedure.</p>
         <div>
         <a href=${dataSend.redirectLink} target="_blank">Click Here</a>
         </div>
         <div>Thank you very much!!!</div>
        `
    }
    return result
}

let getBodyHTMLRedemy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh Online trên BookingcareClone by HoangKha</p>
        <p>Thông tin hóa đơn:</p>
        </div>
        <div>Xin chân thành cảm ơn!!!</div>
        `
    }


    if (dataSend.language === 'en') {
        result = `
        <h3>Hello ${dataSend.patientName}</h3>
         <p>You received this email because you booked an online medical appointment on BookingcareClone by HoangKha</p>
         </div>
         <div>Thank you very much!!!</div>
        `
    }
    return result
}

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secureConnection: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"DangHoangKha 👻" <danghoangkha2006@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLRedemy(dataSend),
        attachments: [
            {
                filename: `redemy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });
}

module.exports = {
    sendSimpleEmail,
    sendAttachment
}