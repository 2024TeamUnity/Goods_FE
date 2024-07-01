import { useMutation } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useUpdatePasswordMutation = (setIsOpen: () => void) => {
  const { mutate, isError } = useMutation({
    mutationFn: async ({
      curPassword,
      newPassword,
    }: {
      curPassword: string;
      newPassword: string;
    }) =>
      (
        await client.put('/api/member/password', {
          cur_password: curPassword,
          new_password: newPassword,
        })
      ).data,
    onSuccess: (res) => {
      if (res.error_code) {
        // eslint-disable-next-line no-alert
        alert(res.message);
      } else {
        // eslint-disable-next-line no-alert
        alert('비밀번호가 변경되었습니다.');
        setIsOpen();
      }
    },
  });

  return { mutate, isError };
};

export const useUpdateTradePasswordMutation = (setIsOpen: () => void) => {
  const { mutate, isError } = useMutation({
    mutationFn: async ({
      curPassword,
      newPassword,
    }: {
      curPassword?: string;
      newPassword: string;
    }) =>
      (
        await client.put('/api/member/trade-password', {
          cur_trade_password: curPassword,
          new_trade_password: newPassword,
        })
      ).data,
    onSuccess: (res) => {
      if (res.error_code) {
        // eslint-disable-next-line no-alert
        alert(res.message);
      } else {
        // eslint-disable-next-line no-alert
        alert('간편결제 비밀번호가 변경되었습니다.');
        setIsOpen();
      }
    },
  });

  return { mutate, isError };
};
