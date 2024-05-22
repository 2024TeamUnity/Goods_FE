import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useAddWishItemMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async (goodsId: number) =>
      (await client.post(`/api/goods/likes`, { goods_id: goodsId })).data,
  });

  return mutate;
};
