import { Modal } from '@/components/Modal'
import { CartItem } from '@/store/shop'
import CartCard from '@/modules/shop/components/CartCard'

export default function PaymentModal({
  handlePurchase,
  items,
  total,
  totalItems,
  email
}: {
  handlePurchase: () => void
  items: CartItem[]
  total: number,
  totalItems: number,
  email: string
}) {

  return (
    <div>
      <Modal
        trigger={
          <button
            className={
              'px-6 py-4 flex items-center justify-center border border-white-13 text-white bg-[#1b1b1b] hover:bg-[#111] rounded w-full mt-4 mb-8'
            }
          >
            Review
          </button>
        }
      >
        <div className={'p-4'}>
          <div className={'w-full sm:w-[500px]'}>
            <div className={'flex flex-col'}>
              <div className={'flex flex-col'}>
                <div className={'flex flex-col mb-4'}>
                  <div>Total: {total} <span className={'text-sm'}>USD</span></div>
                  <div className={'italic'}>{totalItems} items</div>
                  <div>{email}</div>
                </div>
                <div
                  className={'flex flex-col max-h-[300px] gap-2 overflow-y-scroll p-2 border border-white-13'}
                >
                  {items.map((product) => (
                    <CartCard key={product.haus._id} product={product} />
                  ))}
                </div>

                <button
                  onClick={handlePurchase}
                  className={
                    'px-6 py-4 flex items-center justify-center border border-white-13 text-white bg-[#1b1b1b] hover:bg-[#111] rounded w-full mt-4 mb-8'
                  }
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
