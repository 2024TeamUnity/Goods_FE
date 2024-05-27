import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { IChargePoint } from '../../types/interface';

export const useChargeMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: IChargePoint) => (await client.post('/api/point/charge', data)).data,
    onSuccess: (res) => {
      if (res.payment_status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['readPoint'] });
        navigate('/mypage');
      } else {
        // eslint-disable-next-line no-alert
        alert('포인트 충전을 실패했습니다. 담당자에게 문의해주세요.');
        navigate('/mypage');
      }
    },
    onError: (res) => {
      // eslint-disable-next-line no-alert
      alert(res.message);
      navigate('/');
    },
  });

  return { mutate };
};
