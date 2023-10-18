import { CheckoutForm } from '@/modules/store/components/CheckoutForm'
import Cart from '@/modules/store/components/Cart'
import Payment from '@/modules/store/components/Payment'

export default async function Page(context: any) {
  return (
    <CheckoutForm>
      <div className={'flex flex-col md:flex-row gap-12 px-4 sm:px-8'}>
        <div className={'w-full'}>
          <Cart />
        </div>
        <div className={'w-full'}>
          <Payment />
        </div>

      </div>
    </CheckoutForm>
  )
}
