import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import PointCalc from '../components/common/PointCalc';
import { useEffect, useState } from 'react';
import { addComma } from '../util/addComma';
import { useProfileQuery } from '../service/mypage/useUserQueries';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Payment() {
  const [password, setPassword] = useState<number>();
  const { state } = useLocation();
  const { data, isLoading } = useProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    if (!data.trade_password_exists) {
      // eslint-disable-next-line no-alert
      alert(
        '간편거래 비밀번호를 먼저 설정해주세요. 간편거래 비밀번호 설정을 위해 회원 정보 변경 페이지로 이동합니다.',
      );
      navigate('/mypage/update');
    }
  }, [data, navigate]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className='flex h-20 px-3 py-3 md:px-7'>
        <Link to='/'>
          <div className='p-1 rounded-lg hover:bg-neutral-100 '>
            <img src={logo} alt='logo img' className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <div className='flex flex-col items-center w-full max-w-lg px-5 mx-auto mb-20'>
        <h1 className='my-12 text-2xl font-bold text-center md:text-3xl'>결제하기</h1>
        <Link to={`/posts/${state.id}`} className='flex justify-start w-full max-w-lg'>
          <img className='object-cover w-20 h-20 mr-4 rounded-xl' src={state.image} alt='img' />
          <div className='flex flex-col justify-around flex-1 w-full'>
            <p>{state.title}</p>
            <p className='text-xl font-bold'>{`${addComma(String(state.price))}원`}</p>
          </div>
        </Link>
        <div className='w-full max-w-lg mt-6'>
          <h2 className='my-4 text-lg'>* 간편결제 비밀번호를 입력해주세요</h2>
          <label
            htmlFor='passwordInput'
            className='flex flex-row-reverse items-center w-full max-w-lg gap-2 font-bold input input-bordered md:max-w-5xl'
          >
            <input
              id='passwordInput'
              type='password'
              value={password || ''}
              onChange={(e) => setPassword(Number(e.target.value))}
              placeholder='간편결제 비밀번호'
              className='grow'
            />
          </label>
        </div>
        <PointCalc
          type='payment'
          password={password}
          price={state.price}
          goodsId={state.id}
          sellerId={state.sellerId}
        />
      </div>
    </>
  );
}
