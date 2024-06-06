import { useInfiniteQuery } from '@tanstack/react-query';
import { IWishHistoryData } from '../../types/interface';
import client from '../../util/authAxios';

export const usePaginatedHistoryQuery = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['wishList'],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (await client.get(`/api/goods/likes`, { params: { page: pageParam } })).data
        .content as IWishHistoryData[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length ? lastPageParams + 1 : undefined,
  });
  return { data, isLoading, fetchNextPage, hasNextPage };
};
