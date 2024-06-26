import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IGoodsList } from '../../types/interface';

export const useNearbyGoodsPage = (payload: { lat: number; lng: number }, enabled: boolean) => {
  const {
    data: page,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['nearbyPage', `${payload.lat}_${payload.lng}`],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const response = await axios.get(`/api/api/goods`, {
        params: {
          lat: payload.lat,
          lng: payload.lng,
          page: pageParam,
          size: 5,
          responseType: 'page',
        },
      });
      return response.data.content as IGoodsList[];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length > 0) {
        return lastPageParams + 1;
      }
      return undefined;
    },
      enabled,
  });
  return { page, isLoading, hasNextPage, fetchNextPage, refetch };
};

export const useNearbyGoodsList = (payload: { lat: number; lng: number }) => {
  const {
    data: listData,
    isLoading,
    refetch: refetchList,
  } = useQuery({
    queryKey: ['nearbyList', `${payload.lat}_${payload.lng}`],
    queryFn: async () => {
      const response = await axios.get(`/api/api/goods`, {
        params: { lat: payload.lat, lng: payload.lng, responseType: 'list' },
      });
      return response.data;
    },
  });
  return { listData, isLoading, refetchList };
};
