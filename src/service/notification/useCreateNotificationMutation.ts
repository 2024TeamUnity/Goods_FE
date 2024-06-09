import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateNotificationMutation = ({
  token,
  title,
  body,
}: {
  token: string;
  title: string;
  body: string;
}) => {
  const { mutate } = useMutation({
    mutationFn: async () =>
      (
        await axios.post('/api/api/notification', {
          message: {
            token,
            notification: {
              title,
              body,
            },
          },
        })
      ).data,
  });

  return mutate;
};
