import HistoryPageContainer from '../components/common/HistoryPageContainer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Observer from '../components/common/Observer';
import { usePaginatedSalesHistoryQuery } from '../service/mypage/useSalseHistoryQuery';
import { Link } from 'react-router-dom';
import { getTime } from '../util/getTime';
import { addComma } from '../util/addComma';
import { useMemoHistory } from '../util/useMemoHistory';
import { ISalesHistoryData } from '../types/interface';

export default function SalesHistory({ userId, loading }: { userId: string; loading: boolean }) {
  const { data, isLoading, hasNextPage, fetchNextPage } = usePaginatedSalesHistoryQuery(
    String(userId),
  );

  const salesItems = useMemoHistory<ISalesHistoryData>(data!);

  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <HistoryPageContainer isEmpty={!!!salesItems?.length} title='판매 목록'>
      {salesItems?.map((item) => (
        <li
          key={item.goods_id}
          className='flex flex-col w-full transition-all duration-200 scale-95 border rounded-xl gap-y-3 hover:scale-105'
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
              <p className='text-lg font-bold line-clamp-1'>{item.goods_name}</p>
              <p className='flex-1 mt-2 mb-4 text-sm text-neutral-500'>
                {getTime(item.uploaded_before!)}
              </p>
              <div className='flex items-center justify-start text-base gap-x-2'>
                <div
                  className={`break-keep flex items-center justify-center w-16 p-1 text-sm text-white rounded-xl ${
                    item.goods_status === '판매중' && 'bg-secondary'
                  } ${item.goods_status === '예약중' && 'bg-neutral-500'} ${
                    item.goods_status === '거래완료' && 'bg-neutral'
                  }`}
                >
                  {item.goods_status}
                </div>
                <span className='font-bold line-clamp-1'>{addComma(String(item.price))}원</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
      <Observer loadMore={fetchNextPage} hasNext={hasNextPage} />
    </HistoryPageContainer>
  );
}
