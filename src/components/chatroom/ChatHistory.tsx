import { useEffect, useRef } from 'react';
import { IChatLog } from '../../types/interface';
import { useScroll } from '../../util/useScroll';

export default function ChatHistory({ chatLog, myId }: { chatLog: IChatLog[]; myId: number }) {
  const ulRef = useRef<HTMLUListElement>(null);
  const initRef = useRef<HTMLDivElement>(null);
  const show = useScroll(ulRef);

  const handleClick = () => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  };

  const convertToCurrentDateTime = (timeString: string) => {
    if (!timeString) return;

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    const dateTimeString = `${currentDateString}T${timeString}Z`;
    const dateTime = new Date(dateTimeString);
    const hour = dateTime.toTimeString().split(':')[0];
    const min = dateTime.toTimeString().split(':')[1];

    return `${hour}:${min}`;
  };

  useEffect(() => {
    if (initRef.current) {
      initRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [chatLog]);

  return (
    <ul className='relative w-full py-3 overflow-y-auto h-3/4' ref={ulRef}>
      {chatLog!.map((item) => (
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
            {convertToCurrentDateTime(item.created_at.split('Z')[0].split('T')[1])}
          </div>
        </li>
      ))}
      <div ref={initRef} />

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
