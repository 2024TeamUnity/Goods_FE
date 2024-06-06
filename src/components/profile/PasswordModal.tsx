import { useState } from 'react';
import {
  useUpdatePasswordMutation,
  useUpdateTradePasswordMutation,
} from '../../service/mypage/useUpdatePasswordMutation';
import Modal from '../common/Modal';

export default function PasswordModal({ title, noExist }: { title: string; noExist: boolean }) {
  const [curPassword, setCurPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let type = '';
  if (title === '비밀번호') {
    type = 'password';
  } else {
    type = 'trade-password';
  }
  const { mutate: updatePassword, isError: passwordError } = useUpdatePasswordMutation(() =>
    setIsOpen(false),
  );
  const { mutate: updateTradePassword, isError: tradePasswordError } =
    useUpdateTradePasswordMutation(() => setIsOpen(false));

  const handleValidPassword = (newValue: string) => {
    if (
      type === 'password' &&
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/.test(newValue)
    ) {
      setNewPassword(newValue);
      setValid(true);
    } else if (type === 'trade-password' && /^[0-9]{6}$/.test(newValue)) {
      setNewPassword(newValue);
      setValid(true);
    } else {
      setNewPassword(newValue);
      setValid(false);
    }
  };

  const handleUpdatePassword = () => {
    if (type === 'password') {
      updatePassword({ curPassword, newPassword });
    } else {
      updateTradePassword({ curPassword, newPassword });
    }
    setCurPassword('');
    setNewPassword('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdatePassword();
    }
  };

  const handleCancelBtn = () => {
    setCurPassword('');
    setNewPassword('');
    setValid(true);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='btn btn-sm btn-outline btn-neutral'
      >
        변경
      </button>
      <Modal
        isOpen={isOpen}
        title={`${title} 변경`}
        keyword={`${title}를`}
        isError={passwordError || tradePasswordError}
        hasSubmit
        isEmpty={!((curPassword || noExist) && newPassword && valid)}
        handleSubmit={handleUpdatePassword}
        handleCloseModal={handleCancelBtn}
        confirmBtnMsg='변경'
      >
        {!noExist && (
          <label
            htmlFor={`${type}-curPassword`}
            className='flex w-full max-w-lg mb-4 input input-bordered md:max-w-5xl'
          >
            <input
              id={`${type}-curPassword`}
              type='password'
              value={curPassword}
              onChange={(e) => setCurPassword(e.target.value)}
              placeholder={`현재 ${title}`}
              className='font-normal grow'
            />
          </label>
        )}
        <label
          htmlFor={`${type}-newPassword`}
          className='flex w-full max-w-lg mb-4 input input-bordered md:max-w-5xl'
        >
          <input
            id={`${type}-newPassword`}
            type='password'
            value={newPassword}
            onChange={(e) => handleValidPassword(e.target.value)}
            placeholder={`새 ${title}`}
            onKeyDown={handleKeyDown}
            className='font-normal grow'
          />
        </label>
        {!valid && (
          <p className='mb-4 text-sm font-normal text-red-700'>
            {type === 'password'
              ? '영문,숫자,특수문자 포함 (8자 이상, 20자 이하)'
              : '6자리 숫자를 입력해주세요.'}
          </p>
        )}
      </Modal>
    </>
  );
}
