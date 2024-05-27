import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useRemoveWishItemMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (goodsId: number) =>
      (await client.delete(`/api/goods/likes`, { params: { goodsId } })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishHistory'] });
    },
  });
  return mutate;
};
