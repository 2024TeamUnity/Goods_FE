import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IGoodsList } from '../../types/interface';

export const useNearbyGoods = (payload: { lat: number; lng: number }) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['nearby', `${payload.lat}_${payload.lng}`],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (
        await axios.get(`/api/api/goods`, {
          params: {
            lat: payload.lat,
            lng: payload.lng,
            page: pageParam,
            size: 5,
          },
        })
      ).data.content as IGoodsList[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length ? lastPageParams + 1 : undefined,
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
