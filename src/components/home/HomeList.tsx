import { useRecoilValue } from 'recoil';
import { homeListState } from '../../store/atom';
import BottomSheet from '../bottomSheet/BottomSheet';
import HomeListItem from './HomeListItem';
import Observer from '../common/Observer';
import { IObserver } from '../../types/interface';

export default function HomeList({ hasNext, loadMore }: IObserver) {
  const products = useRecoilValue(homeListState);
  console.log(products);

  return (
    <>
      <ul className='overflow-y-auto hidden md:block pb-28 h-full w-[400px] bg-rgba(255,255,255,.7)'>
        <HomeListItem products={products} />
        <Observer hasNext={hasNext} loadMore={loadMore} />
      </ul>

      <BottomSheet products={products} hasNext={hasNext} loadMore={loadMore} />
    </>
  );
}
