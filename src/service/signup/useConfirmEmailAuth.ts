import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useConfirmEmailAuth = (
  setIsOpen: () => void,
  setConfirmed: () => void,
  setDisableModal: () => void,
) => {
  const { mutate } = useMutation({
    mutationFn: async (payload: { email: string; verification_number: number }) =>
      (await axios.post(`/api/api/email/verification/check`, payload)).data,
    onSuccess: (data) => {
      // eslint-disable-next-line no-alert
      alert(data.verified ? '인증 완료' : '일치하지 않습니다');
      if (data.verified) {
        setIsOpen();
        setConfirmed();
        setDisableModal();
      }
    },
  });
  return mutate;
};
