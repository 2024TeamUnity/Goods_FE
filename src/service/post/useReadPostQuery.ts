import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IGoodsData } from '../../types/interface';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../../store/atom';
import client from '../../util/authAxios';

export const useReadPostQuery = (goodsId: string) => {
  const isAuth = useRecoilValue(isAuthState);
  const { isLoading, data } = useQuery<IGoodsData>({
    queryKey: ['goodsDetail', goodsId, isAuth],
    queryFn: async () => {
      const endPoint = isAuth ? `/api/goods/${goodsId}` : `/api/api/goods/${goodsId}`;
      const apiClient = isAuth ? client : axios;
      return (await apiClient.get(endPoint)).data;
    },
  });

  return { isLoading, data };
};
