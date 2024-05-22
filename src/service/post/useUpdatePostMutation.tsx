import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';

export const useUpdatePostMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async ({ post, goods_id }: { post: FormData; goods_id: string }) =>
      (
        await client.put(`/api/goods/${goods_id}`, post, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data,
    onSuccess: (res) => {
      navigate(`/posts/${res.id}`);
    },
  });

  return mutate;
};
