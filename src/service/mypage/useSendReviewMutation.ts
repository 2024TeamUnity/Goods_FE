import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useSendReviewMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async ({ goodsId, star }: { goodsId: number; star: number }) => {
      return (await client.post(`api/trade/goods/${goodsId}/star`, { star })).data;
    },
  });
  return mutate;
};
