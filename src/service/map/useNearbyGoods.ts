import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IGoodsList } from '../../types/interface';

export const useNearbyGoods = (payload: { lat: number; lng: number }) => {
  const { refetch } = useQuery<IGoodsList[]>({
    queryKey: [`nearby`, `${payload.lat}_${payload.lng}`],
    queryFn: async () => (await axios.get(`/api/api/goods`, { params: payload })).data.content,
    enabled: false,
  });
  return { refetch };
};
