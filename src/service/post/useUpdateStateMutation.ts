import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../util/authAxios';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../../store/atom';

export const useUpdateStateMutation = () => {
  const isAuth = useRecoilValue(isAuthState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ goods_id, goods_status }: { goods_id: string; goods_status: string }) =>
      (await client.put(`/api/goods/${goods_id}/state`, { goods_status })).data,
    onSuccess: (_, { goods_id }) => {
      queryClient.invalidateQueries({ queryKey: ['goodsDetail', goods_id, isAuth] });
    },
  });

  return mutate;
};
