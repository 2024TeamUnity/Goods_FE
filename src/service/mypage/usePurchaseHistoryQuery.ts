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
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length > 0) {
        return lastPageParams + 1;
      }
      return undefined;
    },
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
