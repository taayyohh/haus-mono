import EditForm from '@/modules/shop/components/admin/product/Edit'

export default async function Page(context: any) {
  return <EditForm slug={context.params.slug} />
}
