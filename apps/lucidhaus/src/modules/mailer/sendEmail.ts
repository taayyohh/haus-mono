import nodemailer from 'nodemailer'
import config from '@/constants/config'

export interface EmailOptions {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@ifthen.club',
      pass: config.forwardEmail,
    },
  })

  try {
    const info = await transporter.sendMail(options)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Error sending email: ', error)
    throw error // Rethrow the error for further handling if necessary
  }
}
