import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { ITradePoint } from '../../types/interface';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../../store/atom';

export const useTradePointMutation = () => {
  const isAuth = useRecoilValue(isAuthState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: ITradePoint) => (await client.post('/api/trade/point', data)).data,
    onSuccess: (_, { goods_id }) => {
      queryClient.invalidateQueries({ queryKey: ['goodsDetail', goods_id, isAuth] });
      queryClient.invalidateQueries({ queryKey: ['purchaseList'] });
      navigate('/purchase-history');
    },
  });

  return { mutate };
};
