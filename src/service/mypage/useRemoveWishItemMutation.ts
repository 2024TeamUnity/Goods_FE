import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useRemoveWishItemMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async (goodsId: number) =>
      (await client.delete(`/api/goods/likes`, { params: { goods_id: goodsId } })).data,
  });
  return mutate;
};
