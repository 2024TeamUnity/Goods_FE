import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import HistoryPageContainer from '../components/common/HistoryPageContainer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { usePurchaseHistoryQuery } from '../service/mypage/usePurchaseHistoryQuery';
import { useMemoHistory } from '../util/useMemoHistory';
import { getTime } from '../util/getTime';
import { addComma } from '../util/addComma';
import Observer from '../components/common/Observer';
import RatingModal from '../components/common/RatingModal';

export default function PurchaseHistory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('review');

  const { data, isLoading, hasNextPage, fetchNextPage } = usePurchaseHistoryQuery();

  const purchaseList = useMemoHistory(data!);

  const handleOpenModal = (goodsId: number) => {
    navigate(`/purchase-history?review=${goodsId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <HistoryPageContainer title='구매 목록' isEmpty={!!!purchaseList?.length}>
        {purchaseList?.map((item) => (
          <li
            key={item.goods_id}
            className={`flex flex-col w-full transition-all duration-200 scale-95 border rounded-xl gap-y-3 hover:scale-105 ${
              Number(reviewId) === item.goods_id && 'bg-neutral-400'
            }`}
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
                  {getTime(item.traded_before!)}
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
              </div>
            </Link>
            <button
              onClick={() => handleOpenModal(item.goods_id)}
              className='bottom-0 left-0 w-full btn btn-active btn-neutral'
              disabled={item.review_exist}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
              <span>{item.review_exist ? '등록 완료' : '후기 등록'}</span>
            </button>
          </li>
        ))}
        <Observer hasNext={hasNextPage} loadMore={fetchNextPage} />
      </HistoryPageContainer>
      <RatingModal
        id={Number(reviewId)}
        isOpen={reviewId !== null}
        closeModal={() => navigate(-1)}
      />
    </>
  );
}
