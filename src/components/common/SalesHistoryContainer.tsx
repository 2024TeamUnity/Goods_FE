import { useProfileQuery } from '../../service/mypage/useUserQueries';
import SalesHistory from '../../routes/SalesHistory';
import LoadingSpinner from './LoadingSpinner';

export default function SalesHistoryContainer() {
  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  if (profileLoading) return <LoadingSpinner />;
  return <SalesHistory loading={profileLoading} userId={String(profile?.member_id)} />;
}
