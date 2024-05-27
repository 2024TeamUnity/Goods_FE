import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { IWithdrawPoint } from '../../types/interface';

export const useWithdrawMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: IWithdrawPoint) =>
      (await client.post('/api/point/withdraw', data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readPoint'] });
      navigate('/mypage');
    },
  });

  return { mutate };
};
