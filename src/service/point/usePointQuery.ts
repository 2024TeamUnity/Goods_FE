import { useQuery } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const usePointQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['readPoint'],
    queryFn: async () => (await client.get('/api/point/balance')).data,
  });

  return { data, isLoading };
};
