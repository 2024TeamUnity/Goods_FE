import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useUpdateStateMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async ({ goods_id, state }: { goods_id: string; state: string }) =>
      (await client.put(`/api/goods/${goods_id}/state`, { goods_state: state })).data,
  });

  return mutate;
};
