import { EmailOptions } from '@/modules/mailer/sendEmail'

export async function sendEmailConfirmation({
  from,
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<any> {
  const emailOptions = {
    from,
    to,
    subject,
    text,
    html,
  }

  try {
    const response = await fetch('/api/mailer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailOptions),
    })

    return await response.json()
  } catch (err) {
    console.error('Error calling mailer API:', err)
  }
}
