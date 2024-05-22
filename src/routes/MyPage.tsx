import { useRef, useState } from 'react';
import Profile from '../components/profile/Profile';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { useProfileQuery, useResignMutation } from '../service/mypage/useUserQueries';
import { usePointQuery } from '../service/point/usePointQuery';

export default function MyPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [password, setPassword] = useState<string>('');

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const { data: profile, isLoading: profileLoading } = useProfileQuery();
  const { data: point, isLoading: pointLoading } = usePointQuery();
  const { mutate, isError } = useResignMutation();

  const handleResign = () => {
    mutate({ password });
  };

  return (
    <>
      <div className='flex h-20 px-3 py-3 md:px-7'>
        <Link to='/'>
          <div className='p-1 rounded-lg hover:bg-neutral-100 '>
            <img src={logo} alt='logo img' className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <div className='w-full px-5 md:mx-auto md:max-w-5xl'>
        <h1 className='my-12 text-2xl font-bold text-center md:text-3xl'>마이페이지</h1>
        <div className='flex flex-col md:flex-row md:items-end'>
          {!profileLoading && (
            <Profile
              nickName={profile!.nickName}
              profileImage={profile!.profileImage}
              star={profile!.star}
              badgeList={profile!.badgeList}
            />
          )}
          <Link
            to='/mypage/update'
            className='w-full max-w-md mx-auto btn btn-lg btn-neutral no-animation md:flex-none md:btn md:btn-neutral md:w-28 md:mr-0'
          >
            프로필 수정
          </Link>
        </div>
        <div className='w-full max-w-md mx-auto mt-8 border-t-2 md:max-w-5xl md:flex md:flex-row-reverse'>
          <div className='flex flex-col h-40 px-10 py-5 my-8 border rounded-xl border-neutral md:max-w-80 md:mr-0'>
            {!pointLoading && (
              <div className='flex items-center justify-between flex-auto mb-10'>
                <p className='text-xl font-bold'>포인트</p>
                <p className='text-xl font-bold'>{point.price}</p>
              </div>
            )}
            <div className='flex justify-between flex-none'>
              <Link
                to='/mypage/charge'
                role='button'
                className='w-32 mr-2 btn btn-primary shrink md:w-40'
              >
                충전
              </Link>
              <Link
                to='/mypage/transfer'
                role='button'
                className='w-32 ml-2 btn btn-primary shrink md:w-40'
              >
                송금
              </Link>
            </div>
          </div>
          <ul className='w-full min-h-full mt-5 text-xl font-semibold md:ml-0 md:mt-10'>
            <li className='mb-8'>
              <Link to='/wish-history' className='inline-flex items-center'>
                <p className='mr-4'>관심 목록</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-right'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
                  />
                </svg>
              </Link>
            </li>
            <li className='my-8'>
              <Link to='/sales-history' className='inline-flex items-center'>
                <p className='mr-4'>판매 내역</p>{' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-right'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
                  />
                </svg>
              </Link>
            </li>
            <li className='my-8'>
              <Link to='/purchase-history' className='inline-flex items-center'>
                <p className='mr-4'>구매 내역</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-right'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
                  />
                </svg>
              </Link>
            </li>
            <li className='my-8'>
              <button onClick={showModal}>회원 탈퇴</button>
              <dialog ref={dialogRef} className='modal duration-0'>
                <div className='modal-box'>
                  <p className='py-4 text-center'>회원 탈퇴</p>
                  {isError ? (
                    <p className='py-4 text-lg font-normal text-center text-red-700'>
                      비밀번호를 다시 입력해주세요.
                    </p>
                  ) : (
                    <p className='py-4 text-lg font-normal text-center'>비밀번호를 입력하세요.</p>
                  )}
                  <div className='justify-center mt-0 modal-action'>
                    <form method='dialog'>
                      <label
                        htmlFor='password'
                        className='flex w-full max-w-lg mb-8 input input-bordered md:max-w-5xl'
                      >
                        <input
                          id='password'
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder='비밀번호'
                          className='grow'
                        />
                      </label>
                      <div className='flex justify-around w-full mb-4'>
                        <button
                          type='button'
                          onClick={handleResign}
                          className={`btn w-32 mr-2 shrink md:w-40 btn-accent ${
                            password ? '' : ' btn-disabled'
                          }`}
                        >
                          탈퇴
                        </button>
                        <button
                          onClick={() => setPassword('')}
                          className='w-32 ml-2 btn shrink md:w-40 btn-neutral'
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
