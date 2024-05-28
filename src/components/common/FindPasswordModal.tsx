import React, { useState } from 'react';
import { useFindPasswordMutation } from '../../service/signin/useFindPasswordMutation';

export default function FindPasswordModal({ closeModal }: { closeModal: () => void }) {
  const findPassword = useFindPasswordMutation();
  const [email, setEmail] = useState('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const handleSendPassword = () => {
    findPassword(email);
    // eslint-disable-next-line no-alert
    alert('이메일이 발송 되었습니다.');
    closeModal();
  };

  const handleCloseModal = () => closeModal();
  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,.7)]'>
      <div className='relative flex items-center justify-center border-2 bg-neutral-100 rounded-lg boder w-72 h-48 md:w-[500px] md:h-72'>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <h1 className='text-lg font-bold'>이메일을 입력해주세요.</h1>
          <label htmlFor='emailAuth' className='flex items-center gap-2 input input-bordered'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='w-4 h-4 opacity-70'
            >
              <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
              <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
            </svg>
            <input
              value={email}
              onChange={handleEmailChange}
              id='emailAuth'
              type='email'
              className='grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              placeholder='이메일'
            />
          </label>
          <button onClick={handleSendPassword} type='button' className='w-full btn btn-neutral'>
            전송
          </button>
        </div>
        <button
          onClick={handleCloseModal}
          className='absolute text-lg top-1 right-1 md:top-3 md:right-3 '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
