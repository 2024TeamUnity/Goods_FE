import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useSendReviewMutation = (closeModal: () => void) => {
  const { mutate } = useMutation({
    mutationFn: async ({ goodsId, star }: { goodsId: number; star: number }) => {
      return (await client.post(`api/trade/goods/${goodsId}/star`, { star })).data;
    },
    onSuccess: (res) => {
      if (res.error_code) {
        // eslint-disable-next-line no-alert
        alert(res.message);
      } else {
        closeModal();
      }
    },
  });
  return mutate;
};
