import InvoiceConversation from '../../../../components/invoice/conversation';

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceConversation chatId={Number(id)} />;
}
