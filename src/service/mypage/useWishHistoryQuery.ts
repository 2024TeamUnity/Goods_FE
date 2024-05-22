import { useQuery } from '@tanstack/react-query';
import { IWishHistoryResponse } from '../../types/interface';
import client from '../../util/authAxios';

export const useWishHistoryQuery = () => {
  const { isLoading, data } = useQuery<IWishHistoryResponse>({
    queryKey: ['wishHistory'],
    queryFn: async () => (await client.get('/api/goods/likes')).data,
  });
  return { data, isLoading };
};
