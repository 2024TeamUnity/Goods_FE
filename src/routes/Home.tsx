import HomeList from '../components/home/HomeList';
import HomeMap from '../components/home/HomeMap';
import HomeAddr from '../components/home/HomeAddr';
import PermissionNotification from '../components/notification/PermissionNotification';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../store/atom';

export default function Home() {
  const isAuth = useRecoilValue(isAuthState);

  return (
    <div className='absolute top-0 left-0 flex flex-col w-full h-full pt-20 overflow-hidden'>
      <HomeAddr />
      <div className='flex flex-col h-full md:flex-row-reverse'>
        <HomeMap />
        <HomeList />
      </div>
      {isAuth && <PermissionNotification />}
    </div>
  );
}
