import { useLocation, useNavigate } from 'react-router-dom';
import ChatHistory from '../components/chatroom/ChatHistory';
import GoodsInfo from '../components/chatroom/GoodsInfo';
import { useChatHistoryQuery } from '../service/chat/useChatHistoryQuery';
import ChatInput from '../components/chatroom/ChatInput';
import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { IChatLog } from '../types/interface';

export default function ChatRoom() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);
  const {
    state: { roomId },
  } = useLocation();
  const { data, isLoading } = useChatHistoryQuery(roomId);
  const [chatLog, setChatLog] = useState<IChatLog[]>([]);
  const [msg, setMsg] = useState('');

  const stompClient = useRef<CompatClient | null>(null);

  const handleSendMsg = (message: string) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        `/pub/message/${roomId}`,
        {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        JSON.stringify({ message }),
      );
    }
  };

  useEffect(() => {
    if (data) {
      setChatLog(data.chat_logs);
    }
  }, [data]);

  useEffect(() => {
    const socket = new SockJS(import.meta.env.VITE_CHAT_SERVER);

    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      () => {
        stompClient.current?.subscribe(`/sub/message/${roomId}`, (msg) => {
          const messageData = JSON.parse(msg.body);
          setChatLog((prev) => [
            ...prev,
            {
              message: messageData.message,
              created_at: new Date().toISOString(),
              sender_id: messageData.sender_id,
              receiver_id: '',
            },
          ]);
        });
      },
      { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    );
    return () => {
      stompClient.current?.disconnect();
    };
  }, [roomId, data]);

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
          <h1 className='text-2xl font-bold text-center'>{data?.partner}</h1>
        </div>
        <GoodsInfo
          info={{
            id: data!.goods_id,
            image: data!.goods_image,
            name: data!.goods_seller,
            title: data!.goods_name,
            price: data!.goods_price,
            memberType: data!.member_type,
          }}
        />
        <div className='h-0 mb-0 divider' />
        <ChatHistory chatLog={chatLog} myId={data!.member_id} />
        <ChatInput msg={msg} setMsg={setMsg} onSubmitMsg={handleSendMsg} />
      </div>
    </div>
  );
}
