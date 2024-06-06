import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ISalesHistoryData, ISalesHistoryResponse } from '../../types/interface';

export const useSalesHistoryQuery = (memberId: string) => {
  const { data, isLoading } = useQuery<ISalesHistoryResponse>({
    queryKey: ['salesHistory', memberId],
    queryFn: async () => (await axios.get(`/api/api/goods/sell-list/${memberId}`)).data,
    enabled: !!memberId,
  });
  return { data, isLoading };
};

export const usePaginatedSalesHistoryQuery = (memberId: string) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['salesList', memberId],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (
        await axios.get(`/api/api/goods/sell-list/${memberId}`, {
          params: { page: pageParam },
        })
      ).data.content as ISalesHistoryData[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      return lastPage.length ? lastPageParams + 1 : undefined;
    },
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
