import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('accessToken');

export const useUpdatePostMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async ({ post, goods_id }: { post: FormData; goods_id: string }) =>
      (
        await axios.put(`/goods/${goods_id}`, post, {
          headers: {
            Authorization: `Bearer ${token}`,
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
