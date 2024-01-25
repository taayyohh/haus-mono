import EditForm from '@/modules/shop/components/admin/order/Edit'

export default async function Page(context: any) {
  return <EditForm orderId={context.params.slug} />
}
