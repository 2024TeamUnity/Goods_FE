import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IGoodsList } from '../../types/interface';

export const useNearbyGoodsPage = (payload: { lat: number; lng: number }) => {
  const {
    data: page,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['nearbyPage', `${payload.lat}_${payload.lng}`],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (
        await axios.get(`/api/api/goods`, {
          params: {
            lat: payload.lat,
            lng: payload.lng,
            page: pageParam,
            size: 5,
            responseType: 'page',
          },
        })
      ).data.content as IGoodsList[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length ? lastPageParams + 1 : undefined,
  });
  return { page, isLoading, hasNextPage, fetchNextPage };
};

export const useNearbyGoodsList = (payload: { lat: number; lng: number }) => {
  const {
    data: listdata,
    isLoading,
    refetch: refetchList,
  } = useQuery({
    queryKey: ['nearbyList', `${payload.lat}_${payload.lng}`],
    queryFn: async () =>
      (
        await axios.get(`/api/api/goods`, {
          params: { lat: payload.lat, lng: payload.lng, responseType: 'list' },
        })
      ).data,
  });
  return { listdata, isLoading, refetchList };
};
