import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isAuthState } from '../../store/atom';

export const useSigninMutation = () => {
  const navigate = useNavigate();
  const setIsAuth = useSetRecoilState(isAuthState);
  const { mutate } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = (await axios.post('/api/api/member/login', payload)).data;
      if (res.access_token && res.refresh_token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        setIsAuth(true);
      }
      switch (res.status) {
        case 400:
          // eslint-disable-next-line no-alert
          alert(res.message);
          break;
        case 404:
          // eslint-disable-next-line no-alert
          alert(res.message);
          break;
        default:
          navigate('/');
      }
    },
  });
  return mutate;
};
