import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ISalesHistoryResponse } from '../../types/interface';

export const useSalesHistoryQuery = (memberId: string) => {
  const { data, isLoading } = useQuery<ISalesHistoryResponse>({
    queryKey: ['salesHistory', memberId],
    queryFn: async () => (await axios.get(`/api/api/goods/sell-list/${memberId}`)).data,
    enabled: !!memberId,
  });
  return { data, isLoading };
};
