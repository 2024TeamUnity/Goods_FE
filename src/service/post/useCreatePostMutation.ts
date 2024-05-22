import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';

export const useCreatePostMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (post: FormData) =>
      (
        await client.post('/api/goods/new', post, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data,
    onSuccess: (res) => {
      navigate(`/posts/${res.id}`);
    },
    onError: (res) => {
      // eslint-disable-next-line no-alert
      alert(res.message);
      navigate('/');
    },
  });

  return mutate;
};
