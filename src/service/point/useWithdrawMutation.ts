import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { IWithdrawPoint } from '../../types/interface';

export const useWithdrawMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: IWithdrawPoint) =>
      (await client.post('/api/point/withdraw', data)).data,
    onSuccess: () => {
      navigate('/mypage');
    },
  });

  return { mutate };
};
