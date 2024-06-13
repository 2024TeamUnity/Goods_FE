import { Link, useNavigate } from 'react-router-dom';
import { useChatRoomListHistory } from '../service/chat/useChatRoomListQuery';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { notReadState } from '../store/atom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMemoHistory } from '../util/useMemoHistory';
import Observer from '../components/common/Observer';
import { useDeleteChatRoomMutation } from '../service/chat/useDeleteChatRoomMutation';

export default function ChatRoomList() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useChatRoomListHistory();
  const deleteChatRoom = useDeleteChatRoomMutation();
  const chatroomList = useMemoHistory(data!);
  const setNotRead = useSetRecoilState(notReadState);
  const navigate = useNavigate();

  const handleNavigate = () => navigate(-1);

  useEffect(() => {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    const totalNotRead = chatroomList?.reduce((acc, cur) => (acc += cur.not_read), 0);
    setNotRead(totalNotRead!);
  }, [chatroomList, setNotRead]);
  return (
    <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
      <ul className='flex flex-col items-center justify-center w-full mx-auto mb-20 md:max-w-xl'>
        <div className='relative flex items-center w-full py-12'>
          <button className='absolute' onClick={handleNavigate}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className=' size-6 md:size-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
              />
            </svg>
          </button>
          <h2 className='m-auto text-2xl md:text-3xl'>채팅 목록</h2>
        </div>

        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <LoadingSpinner />
        ) : chatroomList!.length === 0 ? (
          <h3 className='text-lg'>결과가 없습니다.</h3>
        ) : (
          Array.isArray(chatroomList) &&
          chatroomList!.map((item) => {
            return (
              <li key={item.room_id} className='relative w-full border-b h-36'>
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
                  {item.not_read === 0 && (
                    <div className='btn btn-circle btn-secondary btn-sm'>{item.not_read}</div>
                  )}
                </Link>
                <details className='absolute cursor-pointer top-5 right-5 dropdown dropdown-end'>
                  <summary className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
                      />
                    </svg>
                  </summary>
                  <ul className='p-2 shadow menu dropdown-content z-[1] rounded-box bg-neutral-100 w-32'>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                    <li
                      onClick={() => deleteChatRoom(item.room_id)}
                      className='p-1 m-auto text-red-500'
                    >
                      {' '}
                      채팅방 나가기
                    </li>
                  </ul>
                </details>
              </li>
            );
          })
        )}
      </ul>
      <Observer hasNext={hasNextPage} loadMore={fetchNextPage} />
    </div>
  );
}
