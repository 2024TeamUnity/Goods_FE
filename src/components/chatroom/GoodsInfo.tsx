import { Link } from 'react-router-dom';
import { useReadPostQuery } from '../../service/post/useReadPostQuery';

export default function GoodsInfo({
  info,
}: {
  info: {
    id: number;
    image: string;
    name: string;
    title: string;
    price: number;
    memberType: string;
  };
}) {
  const { data, isLoading } = useReadPostQuery(String(info.id));

  const addComma = (point: string): string => {
    const commaPoint = point.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return commaPoint;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const combinedInfo = {
    ...info,
    sellerId: data!.seller_id,
  };

  return (
    <div className='flex items-center justify-between px-4 my-5'>
      <Link to={`/posts/${info.id}`} className='flex flex-1 gap-x-4'>
        <img className='w-14 h-14 rounded-xl' src={info.image} alt='goods' />
        <div className='flex flex-col items-start justify-center font-bold gap-y-2'>
          <span className='font-normal'>{info.title}</span>
          <span className='text-lg'>{addComma(String(info.price))}원</span>
        </div>
      </Link>
      {info.memberType === 'BUYER' && (
        <Link to='/payment' state={combinedInfo}>
          <button className='btn btn-active btn-primary btn-md'>거래 요청</button>
        </Link>
      )}
    </div>
  );
}
