import { FormFieldType } from 'mobx-zod-form-store'

export const partialOrderFields = [
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
  {
    name: 'status',
    type: FormFieldType.Select,
    loadOptions: () =>
      Promise.resolve([
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'canceled', label: 'Canceled' },
      ]),
    defaultValue: 'pending',
  },
]

export default partialOrderFields
