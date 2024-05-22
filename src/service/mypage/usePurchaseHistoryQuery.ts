import { useQuery } from '@tanstack/react-query';
import { IPurchaseHistoryResponse } from '../../types/interface';
import client from '../../util/authAxios';

export const usePurchaseHistoryQuery = () => {
  const { data, isLoading } = useQuery<IPurchaseHistoryResponse>({
    queryKey: ['purchaseHistory'],
    queryFn: async () => (await client.get(`/api/trade/purchased-list`)).data,
  });

  return { data, isLoading };
};
