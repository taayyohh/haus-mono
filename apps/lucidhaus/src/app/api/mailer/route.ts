import { NextResponse } from 'next/server'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { sendEmail, EmailOptions } from '@/modules/mailer/sendEmail'

export const POST = async (req: AuthenticatedRequest) => {
  const { from, to, subject, text, html } = await req.json()

  try {
    const emailOptions: EmailOptions = { from, to, subject, text, html }
    await sendEmail(emailOptions)
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('Error sending email:', err)
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
  }
}
