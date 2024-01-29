export async function getSuccessToken(email: string): Promise<{ token: string }> {
  const response = await fetch('/api/stripe/success', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return { token: data.token }
}
