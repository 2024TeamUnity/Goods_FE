import HomeList from '../components/home/HomeList';
import HomeMap from '../components/home/HomeMap';
import HomeAddr from '../components/home/HomeAddr';
import PermissionNotification from '../components/notification/PermissionNotification';
import { useRecoilValue } from 'recoil';
import { isAuthState } from '../store/atom';
import { useState } from 'react';
import { IMyLocation } from '../types/interface';
import { useNearbyGoodsPage, useNearbyGoodsList } from '../service/map/useNearbyGoods';
import { useMemoHistory } from '../util/useMemoHistory';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Home() {
  const isAuth = useRecoilValue(isAuthState);
  const [state, setState] = useState<IMyLocation>({
    center: {
      lat: 0,
      lng: 0,
    },
    errMsg: null,
    isLoading: true,
  });

  const { page, hasNextPage, fetchNextPage } = useNearbyGoodsPage(state.center);
  const { listdata, isLoading } = useNearbyGoodsList(state.center);
  const pageData = useMemoHistory(page!);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className='absolute top-0 left-0 flex flex-col w-full h-full pt-20 overflow-hidden'>
      <HomeAddr />
      <div className='flex flex-col h-full md:flex-row-reverse'>
        <HomeMap listData={listdata} pageData={pageData!} setState={setState} state={state} />
        <HomeList hasNext={hasNextPage} loadMore={fetchNextPage} />
      </div>
      {isAuth && <PermissionNotification />}
    </div>
  );
}
