import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { IChatHistoryData, IChatLog } from '../../types/interface';
import client from '../../util/authAxios';

export const useChatHistoryQuery = (roomId: string) => {
  const { data, isLoading } = useQuery<IChatHistoryData>({
    queryKey: ['chatHistory', `${roomId}`],
    queryFn: async () => (await client.get(`/api/chat/${roomId}`)).data,
  });

  return { data, isLoading };
};

export const useChatLog = (roomId: string) => {
  const {
    data: chatLogData,
    isLoading: chatLogLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['chatLog', roomId],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (await client.get(`/api/chat/${roomId}`, { params: { page: pageParam } })).data.chat_logs
        .content as IChatLog[],
    initialPageParam: 2,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length ? lastPageParam + 1 : undefined,
  });
  return { chatLogData, chatLogLoading, hasNextPage, fetchNextPage };
};
