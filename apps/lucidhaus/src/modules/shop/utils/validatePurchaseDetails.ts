import { z } from 'zod'
import { Stripe, StripeElements } from '@stripe/stripe-js'

const emailValidationSchema = z
  .string()
  .min(1, 'email is required')
  .email({ message: 'invalid email address' })

export async function validatePurchaseDetails(
  stripe: Stripe | null,
  elements: StripeElements | null,
  email: string,
  setEmailError: (error: string) => void
): Promise<boolean> {
  if (!stripe || !elements) return false

  const validationResult = emailValidationSchema.safeParse(email)
  if (!validationResult.success) {
    const firstErrorMessage = validationResult.error.issues[0].message
    setEmailError(firstErrorMessage)
    return false
  }

  try {
    const { error: submitError } = await elements.submit()
    if (submitError) {
      console.log(submitError.message)
      return false
    }

    return true
  } catch (error: any) {
    console.error('Error in form submission:', error)
    return false
  }
}
