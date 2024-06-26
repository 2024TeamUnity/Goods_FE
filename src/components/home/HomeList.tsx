import { useRecoilValue } from 'recoil';
import { homeListState } from '../../store/atom';
import BottomSheet from '../bottomSheet/BottomSheet';
import HomeListItem from './HomeListItem';
import Observer from '../common/Observer';

export default function HomeList() {
  const { data, hasNext, loadMore } = useRecoilValue(homeListState);

  return (
    <>
      <ul className='overflow-y-auto hidden md:block pb-28 h-full w-[400px] bg-rgba(255,255,255,.7)'>
        <HomeListItem products={data} />
        <Observer hasNext={hasNext} loadMore={loadMore} />
      </ul>

      <BottomSheet products={data} hasNext={hasNext} loadMore={loadMore} />
    </>
  );
}
