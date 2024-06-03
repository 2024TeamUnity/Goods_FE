import CardListPage from '../components/common/CardListPage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useSalesHistoryQuery } from '../service/mypage/useSalseHistoryQuery';
import { useProfileQuery } from '../service/mypage/useUserQueries';

export default function SalesHistory() {
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data, isLoading } = useSalesHistoryQuery(String(profile?.member_id));
  if (isLoading || profileLoading) return <LoadingSpinner />;
  return <CardListPage data={data!} title='판매 내역' />;
}
