import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useUpdatePasswordMutation = (type: string) => {
  const { mutate, isError } = useMutation({
    mutationFn: async ({
      curPassword,
      newPassword,
    }: {
      curPassword: string;
      newPassword: string;
    }) =>
      (
        await client.put(`/api/member/${type}`, {
          cur_password: curPassword,
          new_password: newPassword,
        })
      ).data,
  });

  return { mutate, isError };
};
