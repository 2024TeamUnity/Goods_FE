import { Link } from 'react-router-dom';
import { useReadPostQuery } from '../../service/post/useReadPostQuery';
import LoadingSpinner from '../common/LoadingSpinner';
import { addComma } from '../../util/addComma';

export default function GoodsInfo({
  info,
}: {
  info: {
    id: number;
    image: string;
    title: string;
    price: number;
    memberType: string;
  };
}) {
  const { data, isLoading } = useReadPostQuery(String(info.id));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const combinedInfo = {
    ...info,
    sellerId: data!.seller_id,
  };

  return (
    <div className='flex items-center justify-between px-4 my-5'>
      <div className='flex flex-col items-center w-full min-w-0 xs:flex-row gap-y-4 xs:gap-y-0 xs:gap-x-4'>
        <Link to={`/posts/${info.id}`} className='flex flex-1 w-full min-w-0 gap-x-4'>
          <img className='flex-shrink-0 w-14 h-14 rounded-xl' src={info.image} alt='goods' />
          <div className='flex flex-col items-start justify-center flex-1 w-full font-bold gap-y-2'>
            <span className='font-normal line-clamp-1'>{info.title}</span>
            <span className='line-clamp-1'>{addComma(String(info.price))}원</span>
          </div>
        </Link>
        {info.memberType === 'BUYER' &&
          (data!.status !== '거래완료' ? (
            <Link to='/payment' state={combinedInfo} className='w-full xs:max-w-24'>
              <button className='w-full max-w-sm btn btn-primary xs:max-w-24'>거래 요청</button>
            </Link>
          ) : (
            <button className='w-full max-w-sm btn btn-primary xs:max-w-24' disabled>
              거래 요청
            </button>
          ))}
      </div>
    </div>
  );
}
