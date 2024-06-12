import { useRecoilValue } from 'recoil';
import Drawer from '../common/Drawer';
import { useNavigate, useMatch, Link } from 'react-router-dom';
import React from 'react';
import logo from '../../assets/logo.webp';
import { isAuthState } from '../../store/atom';
import SearchBar from './SearchBar';

export default function Header() {
  const isAuth = useRecoilValue(isAuthState);
  const signinMatch = useMatch('/signin');
  const navigate = useNavigate();

  const handleNavigateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText === '로그인') {
      navigate('/signin');
      return;
    }
    navigate('/signup');
  };
  return (
    <div className='fixed top-0 left-0 z-40 flex items-center justify-between w-full h-20 px-3 py-3 bg-white border-b md:px-7 gap-x-2'>
      <Link to='/'>
        <div className='p-1 rounded-lg hover:bg-neutral-100 '>
          <img src={logo} alt='logo img' className='w-8 h-8 md:w-12 md:h-12' />
        </div>
      </Link>
      <SearchBar />
      {isAuth ? (
        <Drawer /> // 사이드바 (로그인 시)
      ) : (
        <button onClick={handleNavigateClick} className='btn btn-outline btn-xs md:btn-sm'>
          {signinMatch ? '회원가입' : '로그인'}
        </button>
      )}
    </div>
  );
}
