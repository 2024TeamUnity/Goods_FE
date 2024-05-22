import CardListPage from '../components/common/CardListPage';
import { useSalesHistoryQuery } from '../service/mypage/useSalseHistoryQuery';
import { useProfileQuery } from '../service/mypage/useUserQueries';

export default function SalesHistory() {
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data, isLoading } = useSalesHistoryQuery(String(profile?.memberId));
  if (isLoading || profileLoading) return <h1>Loading...</h1>;
  return <CardListPage data={data!} title='판매 내역' />;
}
