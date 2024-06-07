import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IMyInfo } from '../../types/interface';
import client from '../../util/authAxios';

export const useProfileQuery = () => {
  const { isLoading, data } = useQuery<IMyInfo>({
    queryKey: ['profile'],
    queryFn: async () => (await client.get('/api/member/profile')).data,
  });

  return { isLoading, data };
};

export const useSellerProfileQuery = (sellerId: string) => {
  const { isLoading, data } = useQuery<IMyInfo>({
    queryKey: ['seller'],
    queryFn: async () => (await axios.get(`/api/api/member/${sellerId}/profile`)).data,
  });

  return { isLoading, data };
};

export const useUpdateProfileMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (profile: FormData) =>
      (
        await client.put('/api/member/profile', profile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data,
    onSuccess: (req) => {
      if (req.nick_name) {
        navigate('/mypage');
      }
    },
  });

  return mutate;
};

export const useResignMutation = (setError: () => void) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (password: { password: string }) =>
      (await client.put('/api/member/resign', password)).data,
    onSuccess: (res) => {
      if (res.error_code) {
        setError();
      } else {
        navigate('/');
      }
    },
  });

  return mutate;
};
