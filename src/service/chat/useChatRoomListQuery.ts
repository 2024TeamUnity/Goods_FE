import { useInfiniteQuery } from '@tanstack/react-query';
import { IChatRoomListData } from '../../types/interface';
import client from '../../util/authAxios';

export const useChatRoomListHistory = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['chatRoomList'],
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      (await client.get('/api/chat/room', { params: { page: pageParam } })).data
        .content as IChatRoomListData[],
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParams) =>
      lastPage.length ? lastPageParams + 1 : undefined,
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
