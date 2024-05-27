import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { useRecoilState } from 'recoil';
import { imgFilesState } from '../../store/atom';

export const useUpdatePostMutation = () => {
  const [, setFiles] = useRecoilState(imgFilesState);
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
    onSuccess: (_, { goods_id }) => {
      setFiles([]);
      navigate(`/posts/${goods_id}`);
    },
  });

  return mutate;
};
