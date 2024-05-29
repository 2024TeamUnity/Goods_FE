import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { Dispatch, SetStateAction } from 'react';
import { IGoodsList } from '../../types/interface';

export const useSearchMutation = (callback: Dispatch<SetStateAction<string>>) => {
  const setHomeList = useSetRecoilState(homeListState);
  const setSearchList = useSetRecoilState(searchResultState);
  const { mutate } = useMutation({
    mutationFn: async (keyword: string) =>
      (await axios.post('api/api/goods/search', { keyword })).data.content,
    onSuccess: (data: IGoodsList[]) => {
      setHomeList(data);
      setSearchList(data);
      callback('');
    },
  });
  return mutate;
};

export const useSearchAddrMutation = () => {
  const setHomeList = useSetRecoilState(homeListState);
  const setSearchList = useSetRecoilState(searchResultState);
  const { mutate } = useMutation({
    mutationFn: async (word: string) =>
      (await axios.post('/api/api/goods/search', { keyword: word })).data,
    onSuccess: (data: IGoodsList[]) => {
      setHomeList(data);
      setSearchList(data);
    },
  });
  return mutate;
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
