import { useEffect, useRef, useState } from 'react';
import { IChatLog } from '../../types/interface';
import { useScroll } from '../../util/useScroll';
import Observer from '../common/Observer';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

export default function ChatHistory({
  chatList,
  myId,
  hasNextPage,
  fetchNextPage,
}: {
  chatList: IChatLog[];
  myId: number;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  // const endRef = useRef<HTMLDivElement>(null);
  // const initRef = useRef<HTMLDivElement>(null);
  const show = useScroll(ulRef);
  const [isMounted, setIsMounted] = useState(false);

  const handleClick = () => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  };

  const convertToCurrentDateTime = (timeString: string) => {
    if (!timeString) return;

    const currentDate = new Date(`${timeString}Z`);
    const hour = currentDate.toTimeString().split(':')[0];
    const min = currentDate.toTimeString().split(':')[1];

    return `${hour}:${min}`;
  };

  /* 첫 렌더링 할 때 스크롤 최하단으로 */
  useEffect(() => {
    if (ulRef.current && chatList.length > 0 && !isMounted) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
      setIsMounted(true);
    }
  }, [chatList, isMounted]);

  /* 이전 채팅 불러올 때 스크롤 위치 유지 */
  const handleScroll = () => {
    if (ulRef.current && ulRef.current.scrollTop === 0 && hasNextPage) {
      const currentScrollHeight = ulRef.current.scrollHeight;

      return fetchNextPage().then(() => {
        if (ulRef.current && ulRef.current.scrollHeight > currentScrollHeight) {
          ulRef.current.scrollTop = ulRef.current.scrollHeight - currentScrollHeight;
        }
      });
    }
    return Promise.resolve(undefined);
  };

  return (
    <ul className='relative w-full py-3 overflow-y-auto h-3/4' ref={ulRef}>
      {isMounted && <Observer loadMore={handleScroll} hasNext={hasNextPage} />}
      {/* <div ref={endRef} /> */}
      {chatList &&
        chatList.map((item) => (
          <li
            key={`${item.created_at}_${item.message}`}
            className={`chat  ${Number(item.sender_id) === myId ? 'chat-end' : 'chat-start'}`}
          >
            <div
              className={`text-black chat-bubble ${
                Number(item.sender_id) === myId ? 'bg-primary-content' : 'bg-neutral-content'
              }`}
            >
              {item.message}
            </div>
            <div className='opacity-50 chat-footer'>
              {convertToCurrentDateTime(item.created_at)}
            </div>
          </li>
        ))}
      {/* <div ref={initRef} /> */}

      {show && (
        <button
          onClick={handleClick}
          className='hover:bg-[rgba(0,0,0,.6)] sticky bottom-0 flex items-center justify-center w-10 h-10 p-1 ml-auto mr-3 text-white bg-black rounded-full '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </button>
      )}
    </ul>
  );
}
