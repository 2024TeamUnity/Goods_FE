import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../util/authAxios';

export const useDeleteChatRoomMutation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (roomId: number) =>
      (await client.post(`/api/chat/room/leave/${roomId}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chatRoomList'] }),
  });

  return mutate;
};
