import { FormFieldType } from 'mobx-zod-form-store'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'

const loadArtists = async () => {
  return (await fetchArtists(1, 30)).data.map((artist) => ({
    value: artist._id,
    label: artist.name,
  }))
}

export const productFields = [
  {
    name: 'name',
    type: FormFieldType.Text,
    placeholder: 'Product Name',
  },
  {
    name: 'slug',
    type: FormFieldType.Text,
    placeholder: 'Slug',
  },
  {
    name: 'price',
    type: FormFieldType.Number,
    placeholder: 'Price',
  },
  {

    name: 'description',
    type: FormFieldType.TextArea,
    placeholder: 'Description',
  },
  // {
  //   name: 'category',
  //   type: FormFieldType.MultiSelect,
  //   loadOptions: loadArtists,
  // },
  {
    name: 'artists',
    type: FormFieldType.MultiSelect,
    loadOptions: loadArtists,
  },
  {
    name: 'quantity',
    type: FormFieldType.Number,
    placeholder: 'Quantity',
  },
  {
    name: 'stock',
    type: FormFieldType.MultiItem,
    fields: [
      {
        name: 'size',
        type: 'select' as 'select',
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        defaultValue: 'M',
      },
      { name: 'quantity', type: 'number' as 'number', defaultValue: 0 },
    ],
  },
  {
    name: 'imageUri',
    type: FormFieldType.ImageUpload,
  },
]
