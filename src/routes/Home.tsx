import HomeList from '../components/home/HomeList';
import HomeMap from '../components/home/HomeMap';
import HomeAddr from '../components/home/HomeAddr';
import { useState } from 'react';
import { IMyLocation } from '../types/interface';
import { useNearbyGoods } from '../service/map/useNearbyGoods';
import { useMemoHistory } from '../util/useMemoHistory';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Home() {
  const [state, setState] = useState<IMyLocation>({
    center: {
      lat: 0,
      lng: 0,
    },
    errMsg: null,
    isLoading: true,
  });

  const { data, isLoading, hasNextPage, fetchNextPage } = useNearbyGoods(state.center);
  const products = useMemoHistory(data!);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className='absolute top-0 left-0 flex flex-col w-full h-full pt-20 overflow-hidden'>
      <HomeAddr />
      <div className='flex flex-col h-full md:flex-row-reverse'>
        <HomeMap products={products!} setState={setState} state={state} />
        <HomeList hasNext={hasNextPage} loadMore={fetchNextPage} />
      </div>
    </div>
  );
}
