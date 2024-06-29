import { useInfiniteQuery } from '@tanstack/react-query';
import { IClusterPayload, IGoodsList } from '../../types/interface';
import axios from 'axios';

export const useClusterInfoQuery = (payload: IClusterPayload) => {
  const { refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [JSON.stringify(payload)],
    queryFn: async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
      const [payload] = queryKey;
      return (
        await axios.post('/api/api/goods', JSON.parse(payload), { params: { page: pageParam } })
      ).data.content as IGoodsList[];
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length > 0) {
        return lastPageParams + 1;
      }
      return undefined;
    },
    enabled: false,
  });
  return { refetch, hasNextPage, fetchNextPage };
};
