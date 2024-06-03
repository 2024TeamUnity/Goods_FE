import CardListPage from '../components/common/CardListPage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePurchaseHistoryQuery } from '../service/mypage/usePurchaseHistoryQuery';

export default function PurchaseHistory() {
  const { data, isLoading } = usePurchaseHistoryQuery();

  if (isLoading) return <LoadingSpinner />;
  return <CardListPage data={data!} title='구매 내역' />;
}
