import CardListPage from '../components/common/CardListPage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useWishHistoryQuery } from '../service/mypage/useWishHistoryQuery';

export default function WishHistory() {
  const { data, isLoading } = useWishHistoryQuery();
  if (isLoading) return <LoadingSpinner />;
  return <CardListPage data={data!} title='관심 목록' />;
}
