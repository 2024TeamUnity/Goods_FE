import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { Dispatch, SetStateAction } from 'react';
import { IGoodsList } from '../../types/interface';

export const useSearchAddrMutation = () => {
  const setHomeList = useSetRecoilState(homeListState);
  const setSearchList = useSetRecoilState(searchResultState);
  const { mutate } = useMutation({
    mutationFn: async (word: string) =>
      (await axios.post('/api/api/goods/search', { keyword: word })).data,
    onSuccess: (data: IGoodsList[]) => {
      setHomeList(data);
      setSearchList(data);
      console.log(data);
    },
  });
  return mutate;
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
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length ? lastPageParam + 1 : undefined,
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
