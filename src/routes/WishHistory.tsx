import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePaginatedHistoryQuery } from '../service/mypage/useWishHistoryQuery';
import Observer from '../components/common/Observer';
import { Link } from 'react-router-dom';
import { getTime } from '../util/getTime';
import AddWishListButton from '../components/common/AddWishListButton';
import HistoryPageContainer from '../components/common/HistoryPageContainer';
import { addComma } from '../util/addComma';
import { useReduceHistory } from '../util/useReduceHistory';
import { IWishHistoryData } from '../types/interface';

export default function WishHistory() {
  const { data, isLoading, hasNextPage, fetchNextPage } = usePaginatedHistoryQuery();

  const wishList = useReduceHistory<IWishHistoryData>(data!);

  if (isLoading) return <LoadingSpinner />;
  return (
    <HistoryPageContainer title='관심 목록' isEmpty={!!!wishList?.length}>
      {wishList?.map((item) => (
        <li
          key={item.goods_id}
          className='flex flex-col w-full transition-all duration-200 scale-95 border rounded-xl gap-y-3 hover:scale-105 '
        >
          <Link
            to={`/posts/${item.goods_id}`}
            className='flex items-center justify-start p-4 gap-x-8'
          >
            <img
              className='object-cover w-24 h-24 rounded-xl md:w-32 md:h-32'
              src={item.goods_thumbnail}
              alt='img'
            />
            <div className='relative flex flex-col flex-1 py-2'>
              <p className='text-lg font-bold'>{item.goods_name}</p>
              <p className='flex-1 mt-2 mb-4 text-sm text-neutral-500'>
                {getTime(item.uploaded_before!)}
              </p>
              <div className='flex items-center justify-start text-base gap-x-2'>
                <div
                  className={`flex items-center justify-center w-16 p-1 text-sm text-white rounded-xl ${
                    item.goods_status === '판매중' && 'bg-secondary'
                  } ${item.goods_status === '예약중' && 'bg-neutral-500'} ${
                    item.goods_status === '거래완료' && 'bg-neutral'
                  }`}
                >
                  {item.goods_status}
                </div>
                <span className='font-bold'>{addComma(String(item.price))}원</span>
              </div>

              <div className='absolute right-2 top-2'>
                <AddWishListButton goodsId={item.goods_id} wish />
              </div>
            </div>
          </Link>
        </li>
      ))}

      <Observer hasNext={hasNextPage} loadMore={fetchNextPage} />
    </HistoryPageContainer>
  );
}
