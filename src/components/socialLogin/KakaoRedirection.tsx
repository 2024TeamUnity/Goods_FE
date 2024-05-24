import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoRedirection() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = new URL(window.location.toString()).searchParams.get('access');
    const refreshToken = new URL(window.location.toString()).searchParams.get('refresh');
    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-screen border gap-x-5'>
      <span className='loading loading-spinner loading-lg' />
      <h1 className='text-lg font-bold md:text-2xl'>로그인 중 입니다...</h1>
    </div>
  );
}
