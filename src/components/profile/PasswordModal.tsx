import { useRef, useState } from 'react';
import { useUpdatePasswordMutation } from '../../service/mypage/useUpdatePasswordMutation';

export default function PasswordModal({ title }: { title: string }) {
  const [curPassword, setCurPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);
  const dialogRef = useRef<HTMLDialogElement>(null);

  let type = '';
  if (title === '비밀번호') {
    type = 'password';
  } else {
    type = 'trade-password';
  }
  const { mutate, isError } = useUpdatePasswordMutation(type);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

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
    mutate({ curPassword, newPassword });
    setCurPassword('');
    setNewPassword('');
    dialogRef.current?.close();
  };

  const handleCancelBtn = () => {
    setCurPassword('');
    setNewPassword('');
    setValid(true);
  };

  return (
    <>
      <button type='button' onClick={showModal} className='btn btn-sm btn-outline btn-neutral'>
        변경
      </button>
      <dialog ref={dialogRef} className='modal duration-0'>
        <div className='modal-box'>
          <p className='py-4 text-lg text-center'>{`${title} 변경`}</p>
          {isError ? (
            <p className='py-4 font-normal text-center text-red-700'>
              {`${title}를 다시 입력해주세요.`}
            </p>
          ) : (
            <p className='py-4 font-normal text-center'>{`${title}를 입력하세요.`}</p>
          )}
          <div className='justify-center mt-0 modal-action'>
            <form method='dialog'>
              <label
                htmlFor={`${type}-curPassword`}
                className='flex w-full max-w-lg mb-8 input input-bordered md:max-w-5xl'
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
              <label
                htmlFor={`${type}-newPassword`}
                className='flex w-full max-w-lg input input-bordered md:max-w-5xl'
              >
                <input
                  id={`${type}-newPassword`}
                  type='password'
                  value={newPassword}
                  onChange={(e) => handleValidPassword(e.target.value)}
                  placeholder={`새 ${title}`}
                  className='font-normal grow'
                />
              </label>
              {!valid && type === 'password' && (
                <p className='mt-2 text-sm font-normal text-right text-red-700'>
                  영문,숫자,특수문자 포함 (8자 이상, 20자 이하)
                </p>
              )}
              {!valid && type === 'trade-password' && (
                <p className='mt-2 text-sm font-normal text-right text-red-700'>
                  6자리 숫자를 입력해주세요.
                </p>
              )}
              <div className='flex justify-around w-full mt-8 mb-4'>
                <button
                  type='button'
                  onClick={handleUpdatePassword}
                  className={`btn w-32 mr-2 shrink md:w-40 btn-accent ${
                    curPassword && newPassword && valid ? '' : ' btn-disabled'
                  }`}
                >
                  변경
                </button>
                <button
                  onClick={handleCancelBtn}
                  className='w-32 ml-2 btn shrink md:w-40 btn-neutral'
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
