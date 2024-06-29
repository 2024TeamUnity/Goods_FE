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
    getNextPageParam: (lastPage, _, lastPageParams) => {
      if (Array.isArray(lastPage) && lastPage.length > 0) {
        return lastPageParams + 1;
      }
      return undefined;
    },
  });
  return { data, isLoading, hasNextPage, fetchNextPage };
};
