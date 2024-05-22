import { useQuery } from '@tanstack/react-query';
import { IChatRoomListData } from '../../types/interface';
import client from '../../util/authAxios';

export const useChatRoomListQuery = () => {
  const { data, isLoading } = useQuery<IChatRoomListData[]>({
    queryKey: ['chatRoomList'],
    queryFn: async () => (await client.get('/api/chat/room')).data,
  });

  return { data, isLoading };
};
