import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useAddWishItemMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ goodsId }: { goodsId: number }) =>
      (await client.post(`/api/goods/likes`, null, { params: { goodsId } })).data,
    onSuccess: (_, { goodsId }) => {
      queryClient.invalidateQueries({ queryKey: ['goodsDetail', goodsId] });
    },
  });

  return mutate;
};
