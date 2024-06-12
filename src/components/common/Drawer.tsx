import { Link } from 'react-router-dom';
import { useMyInfoQuery } from '../../service/signin/useMyInfoQuery';
import { useSignoutMutation } from '../../service/signin/useSignoutMutation';
// import { useChatRoomListQuery } from '../../service/chat/useChatRoomListQuery';
// import { useEffect, useState } from 'react';

export default function Drawer() {
  // const [totalNotRead, setTotalNotRead] = useState(0);
  const { info, isLoading: infoLoading } = useMyInfoQuery();
  const logout = useSignoutMutation();
  // const { data, isLoading: notReadLoading } = useChatRoomListQuery();

  // useEffect(() => {
  //   if (data) {
  //     // eslint-disable-next-line no-return-assign, no-param-reassign
  //     const notRead = data.reduce((acc, cur) => (acc += cur.not_read), 0);
  //     setTotalNotRead(notRead!);
  //   }
  // }, [data]);

  const handleLogout = () => logout();

  if (infoLoading) return <div className='w-8 h-8 rounded-full md:w-10 md:h-10 skeleton' />;
  return (
    <div className='z-50 flex items-center justify-end w-8 md:w-16 drawer drawer-end'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label htmlFor='my-drawer-4' className='drawer-button'>
          {/* 프로필 이미지 */}
          <div className='avatar'>
            <div className='w-6 rounded-full cursor-pointer md:w-8 ring ring-primary ring-offset-base-100 ring-offset-2'>
              {info?.profile_image ? (
                <img src={info?.profile_image} alt='profile_image' />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='fill-neutral'
                  className='w-6 h-6 p-1 rounded-xl md:w-8 md:h-8 bi bi-person-fill bg-neutral-200'
                  viewBox='0 0 16 16'
                >
                  <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>
      <div className='drawer-side'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='my-drawer-4' aria-label='close sidebar' className='drawer-overlay' />
        <ul className='w-2/3 min-h-full p-4 font-semibold menu md:w-80 bg-base-200 text-base-content '>
          <div className='flex items-center justify-between mx-4'>
            <h1 className='my-5 text-xl font-bold md:text-3xl'>{info?.nick_name}</h1>
            <div className='avatar'>
              <div className='w-6 rounded-full cursor-pointer md:w-8 ring ring-primary ring-offset-base-100 ring-offset-2'>
                {info?.profile_image ? (
                  <img src={info?.profile_image} alt='profile_image' />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='fill-neutral'
                    className='w-6 h-6 p-1 rounded-xl md:w-8 md:h-8 bi bi-person-fill bg-neutral-200'
                    viewBox='0 0 16 16'
                  >
                    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6' />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <li>
              <Link to='/mypage'>마이페이지</Link>
            </li>
            <li>
              <Link className='relative' to='/roomList'>
                채팅 목록
                {/* {totalNotRead !== 0 && (
                  <div className='absolute left-[75px] top-0 flex items-center justify-center w-5 h-5 p-2 text-white bg-black border rounded-full'>
                    {totalNotRead}
                  </div>
                )} */}
              </Link>
            </li>
            <li>
              <Link to='/wish-history'>관심 목록</Link>
            </li>
            <li>
              <Link to='/sales-history'>판매 내역</Link>
            </li>
            <li>
              <Link to='/purchase-history'>구매 내역</Link>
            </li>
            <li>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <span onClick={handleLogout}>로그아웃</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
