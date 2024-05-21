import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { homeListState, searchResultState } from '../../store/atom';
import { Dispatch, SetStateAction } from 'react';
import { ISearchData } from '../../mocks/data/searchData';

export const useSearchMutation = (callback: Dispatch<SetStateAction<string>>) => {
  const setHomeList = useSetRecoilState(homeListState);
  const setSearchList = useSetRecoilState(searchResultState);
  const { mutate } = useMutation({
    mutationFn: async (keyword: string) => (await axios.post('api/goods/search', { keyword })).data,
    onSuccess: (data: ISearchData[]) => {
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
    onSuccess: (data: ISearchData[]) => {
      setHomeList(data);
      setSearchList(data);
    },
  });
  return mutate;
};

export const useUpdateSearchMutation = (
  callback: Dispatch<SetStateAction<ISearchData[]>>,
  keyword: string,
) => {
  const { mutate } = useMutation({
    mutationFn: async () => (await axios.post('api/goods/search', { keyword })).data,
    onSuccess: (data) => {
      callback([{ id: Date.now(), name: keyword }, ...data]);
    },
  });
  return mutate;
};
