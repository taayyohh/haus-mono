import { FormFieldType } from 'mobx-zod-form-store'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import { fetchProducts } from '@/modules/shop'

// const loadProducts = async () => {
//   return (await fetchProducts(1, 30)).data.map((product) => ({
//     value: product._id,
//     label: product.name,
//   }))
// }

export const orderFields = [
  {
    name: 'email',
    type: FormFieldType.Text,
    placeholder: 'Email',
  },
  {
    name: 'user',
    type: FormFieldType.Text,
    placeholder: 'User ID',
  },
  // {
  //   // Assuming products in the order are managed differently, e.g., through a sub-form or a different UI component
  //   name: 'products',
  //   type: FormFieldType.MultiSelect,
  //   loadOptions: () => [],
  // },
  {
    name: 'status',
    type: FormFieldType.Select,
    options: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    defaultValue: 'pending',
  },
  {
    name: 'totalPrice',
    type: FormFieldType.Number,
    placeholder: 'Total Price',
  },
  // {
  //   name: 'shippingAddress',
  //   type: FormFieldType.Group,
  //   fields: [
  //     { name: 'street', type: FormFieldType.Text, placeholder: 'Street' },
  //     { name: 'city', type: FormFieldType.Text, placeholder: 'City' },
  //     { name: 'state', type: FormFieldType.Text, placeholder: 'State' },
  //     { name: 'postalCode', type: FormFieldType.Text, placeholder: 'Postal Code' },
  //     { name: 'country', type: FormFieldType.Text, placeholder: 'Country' },
  //   ],
  // },
  {
    name: 'trackingNumber',
    type: FormFieldType.Text,
    placeholder: 'Tracking Number',
  },
  {
    name: 'notes',
    type: FormFieldType.TextArea,
    placeholder: 'Notes',
  },
]

export default orderFields
