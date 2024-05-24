import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';
import { useSetRecoilState } from 'recoil';
import { isAuthState } from '../../store/atom';
import { useNavigate } from 'react-router-dom';

export const useSignoutMutation = () => {
  const setIsAuth = useSetRecoilState(isAuthState);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async () => client.post('api/member/logout'),
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsAuth(false);
      navigate('/');
    },
  });
  return mutate;
};
