'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeWrapperProps {
  children: ReactNode;
  clientSecret?: string;
}

export function StripeWrapper({ children, clientSecret }: StripeWrapperProps) {
  const options = {
    ...(clientSecret && { clientSecret }),
    paymentMethodCreation: 'manual' as const,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#A8E4DA',
        colorBackground: '#1b1b1b',
        colorText: '#ffffff',
        colorDanger: '#df1b41',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '0px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
