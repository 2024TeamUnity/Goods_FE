import { useNavigate, useParams } from 'react-router-dom';
import ChatHistory from '../components/chatroom/ChatHistory';
import GoodsInfo from '../components/chatroom/GoodsInfo';
import { useChatHistoryQuery } from '../service/chat/useChatHistoryQuery';
import ChatInput from '../components/chatroom/ChatInput';

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const { data, isLoading } = useChatHistoryQuery(roomId!);

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-screen overflow-y-hidden bg-slate-900 '>
      <div className='relative w-full h-full md:rounded-3xl md:h-[95%] md:w-[450px] p-3 md:p-5 bg-white md:border-4'>
        <div className='relative '>
          <button onClick={handleNavigate}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='absolute w-6 h-6 stroke-2 bottom-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
              />
            </svg>
          </button>
          <h1 className='text-2xl font-bold text-center'>{data?.goods_seller}</h1>
        </div>
        <GoodsInfo
          info={{
            id: data!.goods_id,
            image: data!.goods_image,
            name: data!.goods_seller,
            title: data!.goods_name,
            price: data!.goods_price,
          }}
        />
        <div className='divider before:h-1 after:h-1' />
        <ChatHistory chatLog={data!.chatLog} />
        <ChatInput />
      </div>
    </div>
  );
}
