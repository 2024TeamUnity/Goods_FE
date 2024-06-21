import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useSendTokenMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async (token: string) =>
      (await client.post('/api/notification/new', { fcm_token: token })).data,
  });

  return mutate;
};
