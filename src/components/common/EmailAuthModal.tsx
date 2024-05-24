import React, { useState } from 'react';
import { useConfirmEmailAuth } from '../../service/signup/useConfirmEmailAuth';

export default function EmailAuthModal({
  closeModal,
  setDisableModal,
  email,
}: {
  closeModal: () => void;
  setDisableModal: () => void;
  email: string;
}) {
  const [code, setCode] = useState<number | string>('');
  const confirmEmailAuth = useConfirmEmailAuth(closeModal, setDisableModal);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCode(Number(e.currentTarget.value));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      confirmEmailAuth({ email, verification_number: code as number });
    }
  };
  const handleSubmit = () => {
    if (typeof code === 'string') return;
    confirmEmailAuth({ email, verification_number: code! });
  };
  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-[rgba(0,0,0,.7)]'>
      <div className='relative flex items-center justify-center border-2 bg-neutral-100 rounded-lg boder w-72 h-48 md:w-[500px] md:h-72'>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <h1 className='text-lg font-bold'>이메일이 전송되었습니다.</h1>
          <label htmlFor='emailAuth' className='flex items-center gap-2 input input-bordered'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='w-4 h-4 opacity-70'
            >
              <path
                fillRule='evenodd'
                d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                clipRule='evenodd'
              />
            </svg>
            <input
              value={code!}
              onChange={handleCodeChange}
              id='emailAuth'
              type='number'
              onKeyDown={handleKeyDown}
              className='grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              placeholder='인증번호'
            />
          </label>
          <button onClick={handleSubmit} type='button' className='w-full btn btn-neutral'>
            인증 완료
          </button>
        </div>
        <button
          onClick={closeModal}
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
