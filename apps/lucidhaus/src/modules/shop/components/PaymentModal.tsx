import { Modal } from '@/components/Modal'
import { CartItem } from '@/store/shop'
import CartCard from '@/modules/shop/components/CartCard'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { motion } from 'framer-motion'
import { addressType } from '@/modules/shop/components/Payment'

export default function PaymentModal({
  handlePurchase,
  items,
  total,
  totalItems,
  email,
  name,
  address,
  validateBeforeOpen,
  isLoading,
  internationalTotal,
}: {
  handlePurchase: () => void
  items: CartItem[]
  total: number
  internationalTotal: number
  totalItems: number
  email: string
  name: string
  address?: addressType
  validateBeforeOpen?: () => Promise<boolean>
  isLoading: boolean
}) {
  const circleNotchVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        ease: [0.6, 0.01, 0.5, 1],
        duration: 2,
        repeat: Infinity,
      },
    },
  }

  return (
    <div>
      <Modal
        validateBeforeOpen={validateBeforeOpen}
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
                  <div className={'text-3xl'}>
                    Total: {internationalTotal} <span className={'text-sm'}>USD</span>
                  </div>
                  {internationalTotal !== total && (
                    <div className={'flex gap-1 text-sm py-1 italic'}>
                      {total} USD + ({internationalTotal - total}{' '}
                      <span className={'xs'}>USD</span> international shipping)
                    </div>
                  )}
                  <div className={'italic'}>{totalItems} items</div>
                  <div className="flex flex-col mt-4 gap-2 bg-[#1b1b1b] px-4 py-2">
                    <div>
                      <div>{name}</div>
                      <div>{email}</div>
                    </div>

                    {address && (
                      <div>
                        <div>
                          {address.line1}, {address.line2 && <span>{address.line2}</span>}
                        </div>

                        <div>
                          {address.city}, {address.state} {address.postal_code}
                        </div>
                        <div>{address.country}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={
                    'flex flex-col max-h-[300px] gap-2 overflow-y-scroll p-2 border border-white-13'
                  }
                >
                  {items.map((cartItem, i) => (
                    <CartCard
                      key={`${cartItem.haus.stripeId}-${i}`}
                      cartItem={cartItem}
                    />
                  ))}
                </div>
                <button
                  onClick={handlePurchase}
                  className={`px-6 py-4 flex items-center justify-center border ${
                    isLoading ? 'border-[#1b1b1b]' : 'border-white-13 hover:bg-[#111]'
                  } text-white bg-[#1b1b1b] rounded w-full mt-4 mb-8`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      variants={circleNotchVariants}
                      animate="animate"
                      style={{ originX: 0.5, originY: 0.5 }} // Ensures rotation around the center
                    >
                      <CircleNotch />
                    </motion.div>
                  ) : (
                    'Purchase'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
