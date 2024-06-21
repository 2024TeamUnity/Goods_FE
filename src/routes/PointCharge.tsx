import { Link, useNavigate } from 'react-router-dom';
import PointCalc from '../components/common/PointCalc';
import logo from '../assets/logo.webp';
import { useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProfileQuery } from '../service/mypage/useUserQueries';

export default function PointCharge() {
  const { data, isLoading } = useProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    if (data.phone_number === '') {
      // eslint-disable-next-line no-alert
      alert(
        '전화번호를 먼저 설정해주세요. 전화번호 설정을 위해 회원 정보 변경 페이지로 이동합니다.',
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
      <div className='flex flex-col items-center w-full px-5 md:mx-auto md:max-w-5xl'>
        <h1 className='my-12 text-2xl font-bold text-center md:text-3xl'>포인트 충전</h1>
        <PointCalc type='charge' />
      </div>
    </>
  );
}
