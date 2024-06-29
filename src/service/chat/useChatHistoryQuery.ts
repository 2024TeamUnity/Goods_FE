import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { IChatLog, IChatRoomData } from '../../types/interface';
import client from '../../util/authAxios';

export const useChatHistoryQuery = (roomId: string) => {
  const { data, isLoading } = useQuery<IChatRoomData>({
    queryKey: ['chatHistory', `${roomId}`],
    queryFn: async () => (await client.get(`/api/chat/room/${roomId}`)).data,
  });

  return { data, isLoading };
};

export const usePaginatedChatHistoryQuery = (roomId: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['chatLog', roomId],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = (await client.get(`/api/chat/${roomId}`, { params: { page: pageParam } }))
        .data.content as IChatLog[];
      const messages = response.reverse();
      return messages;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length > 0) {
        return lastPageParams + 1;
      }
      return undefined;
    },
  });
  return { data, isLoading, fetchNextPage, hasNextPage };
};
