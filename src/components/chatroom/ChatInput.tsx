import React, { Dispatch, SetStateAction, useRef } from 'react';

export default function ChatInput({
  msg,
  setMsg,
  onSubmitMsg,
}: {
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
  onSubmitMsg: (message: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.currentTarget.value);
    e.currentTarget.style.height = '0';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!msg || [...msg].every((item) => item === '\n')) return;
    if (e.shiftKey && e.key === 'Enter') {
      e.currentTarget.style.height = '0';
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmitMsg(msg);
      setMsg('');
      e.currentTarget.style.height = 'auto';
    }
  };

  const handleSendButtonClick = () => {
    if (!msg) return;
    if (ref.current) {
      const { current } = ref;
      current.style.height = 'auto';
      onSubmitMsg(msg);
      setMsg('');
      current.focus();
    }
  };

  return (
    <div className='absolute left-0 right-0 flex items-center justify-center w-full px-2 m-auto bottom-2 gap-x-3'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className='p-1 cursor-pointer text-white rounded-full md:p-2 bg-neutral hover:bg-[rgba(0,0,0,.6)]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
          />
        </svg>
        <input type='file' hidden />
      </label>
      <textarea
        ref={ref}
        value={msg}
        onChange={handleTextAreaChange}
        rows={1}
        onKeyDown={handleKeyDown}
        className='w-3/4 px-5 py-3 border resize-none max-h-24 rounded-3xl '
      />
      <button
        onClick={handleSendButtonClick}
        className='p-1 text-white rounded-full md:p-2 bg-neutral hover:bg-[rgba(0,0,0,.6)]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
          />
        </svg>
      </button>
    </div>
  );
}
