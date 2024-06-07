import React, { useState } from 'react';
import { useConfirmEmailAuth } from '../../service/signup/useConfirmEmailAuth';
import Modal from './Modal';
import { useEmailAuthRequestMutation } from '../../service/signup/useEmailAuthReqestMutation';

export default function EmailAuthModal({
  setDisableModal,
  email,
}: {
  setDisableModal: () => void;
  email: string;
}) {
  const [code, setCode] = useState<number | string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmed, setConfirmed] = useState<boolean>(false);

  const confirmEmailAuth = useConfirmEmailAuth(
    () => setIsOpen(false),
    () => setConfirmed(true),
    setDisableModal,
  );
  const sendEmail = useEmailAuthRequestMutation();

  const handleAuthEmailClick = async () => {
    if (email === '') return;
    sendEmail(email);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      confirmEmailAuth({ email, verification_number: code as number });
    }
  };

  const handleAuthCodeSubmit = () => {
    if (typeof code === 'string') return;
    confirmEmailAuth({ email, verification_number: code! });
  };

  const handleClose = () => {
    setIsOpen(false);
    setCode('');
  };

  return (
    <>
      <button
        onClick={handleAuthEmailClick}
        type='button'
        className='w-full btn btn-neutral'
        disabled={isConfirmed}
      >
        이메일 인증
      </button>
      <Modal
        isOpen={isOpen}
        title='이메일이 전송되었습니다.'
        keyword='인증번호를'
        isError={false}
        hasSubmit
        isEmpty={!code}
        handleSubmit={handleAuthCodeSubmit}
        handleCloseModal={handleClose}
        confirmBtnMsg='인증 완료'
      >
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
            onChange={(e) => setCode(Number(e.currentTarget.value))}
            id='emailAuth'
            type='number'
            onKeyDown={handleKeyDown}
            className='grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='인증번호'
          />
        </label>
      </Modal>
    </>
  );
}
