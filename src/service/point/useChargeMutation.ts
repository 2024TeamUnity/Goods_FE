import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import client from '../../util/authAxios';
import { IChargePoint } from '../../types/interface';

export const useChargeMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: IChargePoint) => (await client.post('/api/point/charge', data)).data,
    onSuccess: () => {
      navigate('/mypage');
    },
  });

  return { mutate };
};
