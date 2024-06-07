import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useFindPasswordMutation = (setIsOpen: () => void) => {
  const { mutate } = useMutation({
    mutationFn: async (email: string) => (await axios.post('/api/api/member/find', { email })).data,
    onSuccess: (res) => {
      if (res.error_code) {
        // eslint-disable-next-line no-alert
        alert(res.message);
      } else {
        // eslint-disable-next-line no-alert
        alert('이메일이 발송 되었습니다.');
        setIsOpen();
      }
    },
  });
  return mutate;
};
