import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';

export const useDeletePostMutation = (memberId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (goodsId: string) => (await client.delete(`/api/goods/${goodsId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesHistory', memberId] });
      navigate('/');
    },
  });

  return mutate;
};
