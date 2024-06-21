import { Link, useParams } from 'react-router-dom';
import logo from '../assets/logo.webp';
import Profile from '../components/profile/Profile';
import { useSellerProfileQuery } from '../service/mypage/useUserQueries';
import SalesHistory from './SalesHistory';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Shop() {
  const { id } = useParams();

  const { data: profile, isLoading: profileLoading } = useSellerProfileQuery(id!);

  if (profileLoading) return <LoadingSpinner />;
  return (
    <>
      <div className='flex h-20 px-3 py-3 justify-normal md:px-7'>
        <Link to='/'>
          <div className='p-1 rounded-lg hover:bg-neutral-100 '>
            <img src={logo} alt='logo img' className='w-12 h-12' />
          </div>
        </Link>
      </div>
      <div className='w-full max-w-xl px-5 mx-auto md:pb-12'>
        <p className='my-12 text-2xl font-bold text-center md:text-3xl'>판매자 프로필</p>
        <Profile
          nick_name={profile!.nick_name}
          profile_image={profile!.profile_image}
          star={profile!.star}
          badge_list={profile!.badge_list}
        />
      </div>
      <SalesHistory loading={profileLoading} userId={id!} />
    </>
  );
}
