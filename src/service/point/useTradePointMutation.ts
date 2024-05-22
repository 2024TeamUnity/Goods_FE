import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { ITradePoint } from '../../types/interface';

export const useTradePointMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: ITradePoint) => (await client.post('/api/trade/point', data)).data,
    onSuccess: () => {
      navigate(-1);
    },
  });

  return { mutate };
};
