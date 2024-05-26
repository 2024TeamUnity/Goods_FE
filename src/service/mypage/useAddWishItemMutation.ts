import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../util/authAxios';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../../store/atom';

export const useAddWishItemMutation = () => {
  const isAuth = useRecoilValue(isAuthState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ goodsId }: { goodsId: number }) =>
      (await client.post(`/api/goods/likes`, null, { params: { goodsId } })).data,
    onSuccess: (_, { goodsId }) => {
      queryClient.invalidateQueries({ queryKey: ['goodsDetail', goodsId, isAuth] });
      queryClient.invalidateQueries({ queryKey: ['wishHistory'] });
    },
  });

  return mutate;
};
