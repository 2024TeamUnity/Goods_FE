import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { IGoodsList } from '../../types/interface';

export const useSearchAddressQuery = (keyword: string) => {
  const { refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['address', keyword],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (await axios.post('/api/api/goods/search', { keyword }, { params: { page: pageParam } })).data
        .content as IGoodsList[],
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

export const useSearchQuery = (keyword: string, callback: Dispatch<SetStateAction<string>>) => {
  // 배포 후 타입체크, 타입 방어?
  const { refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', keyword],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = (
        await axios.post('/api/api/goods/search', { keyword }, { params: { page: pageParam } })
      ).data.content as IGoodsList[];
      callback('');
      return res;
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

export const useUpdateSearchMutation = (
  callback: Dispatch<SetStateAction<IGoodsList[]>>,
  keyword: string,
) => {
  const { mutate } = useMutation({
    mutationFn: async () => (await axios.post('/api/api/goods/search', { keyword })).data.content,
    onSuccess: (data) => {
      callback([{ id: Date.now(), goods_name: keyword } as unknown, ...data]);
    },
  });
  return mutate;
};
