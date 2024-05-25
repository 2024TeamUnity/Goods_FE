import { useQuery } from '@tanstack/react-query';
import { IChatHistoryData } from '../../types/interface';
import client from '../../util/authAxios';

export const useChatHistoryQuery = (roomId: string) => {
  const { data, isLoading } = useQuery<IChatHistoryData>({
    queryKey: ['chatHistory', `${roomId}`],
    queryFn: async () => (await client.get(`/api/chat/${roomId}`)).data,
  });
  return { data, isLoading };
};
