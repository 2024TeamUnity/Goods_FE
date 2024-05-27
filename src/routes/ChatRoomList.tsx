import { Link } from 'react-router-dom';
import { useChatRoomListQuery } from '../service/chat/useChatRoomListQuery';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { notReadState } from '../store/atom';

export default function ChatRoomList() {
  const { data, isLoading } = useChatRoomListQuery();
  const setNotRead = useSetRecoilState(notReadState);

  useEffect(() => {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    const totalNotRead = data?.reduce((acc, cur) => (acc += cur.not_read), 0);
    setNotRead(totalNotRead!);
  }, [data, setNotRead]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
      <h2 className='my-12 text-2xl font-bold text-center md:text-3xl'>채팅 목록</h2>
      <ul className='flex flex-col items-center justify-center w-full mx-auto mb-20 md:max-w-xl'>
        {data!.length === 0 ? (
          <h3 className='text-lg'>결과가 없습니다.</h3>
        ) : (
          Array.isArray(data) &&
          data!.map((item) => {
            return (
              <li key={item.room_id} className='w-full border-b h-36'>
                <Link
                  to={`/room/${item.room_id}`}
                  className='flex items-center justify-start h-full p-4 gap-x-8'
                  state={{ roomId: item.room_id }}
                >
                  <img
                    className='object-cover w-20 h-20 grow-0 rounded-xl md:w-28 md:h-28'
                    src={item.goods_image}
                    alt='thumbnail'
                  />
                  <div className='flex flex-col justify-around flex-1 w-full h-full min-w-0 py-2'>
                    <p className='text-lg font-bold truncate'>{item.partner}</p>
                    <p className='truncate'>{item.last_message}</p>
                    <p className='text-sm truncate text-stone-400'>{item.updated_at}</p>
                  </div>
                  {item.not_read > 0 && (
                    <div className='btn btn-circle btn-secondary btn-sm'>{item.not_read}</div>
                  )}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
