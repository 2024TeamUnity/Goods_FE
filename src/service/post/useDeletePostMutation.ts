import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';

export const useDeletePostMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (goodsId: string) => (await client.delete(`/api/goods/${goodsId}`)).data,
    onSuccess: () => {
      navigate('/');
    },
  });

  return mutate;
};
