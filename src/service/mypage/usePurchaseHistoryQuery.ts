import { useInfiniteQuery } from '@tanstack/react-query';
import { IPurchaseHistoryData } from '../../types/interface';
import client from '../../util/authAxios';

export const usePurchaseHistoryQuery = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['purchaseList'],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (await client.get('/api/trade/purchased-list', { params: { page: pageParam } })).data
        .content as IPurchaseHistoryData[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length ? lastPageParams + 1 : undefined,
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
