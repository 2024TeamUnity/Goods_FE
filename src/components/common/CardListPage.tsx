import { Link, useMatch } from 'react-router-dom';
import {
  IPurchaseHistoryResponse,
  ISalesHistoryResponse,
  IWishHistoryResponse,
} from '../../types/interface';
import CardListItem from './CardListItem';

export default function CardListPage({
  data,
  title,
}: {
  data: IPurchaseHistoryResponse | IWishHistoryResponse | ISalesHistoryResponse;
  title: string;
}) {
  const purchaseHistoryMatch = useMatch('/purchase-history');

  return (
    <div className='max-w-md px-5 mx-auto md:max-w-5xl'>
      <ul className='flex flex-col items-center justify-center w-full mx-auto md:max-w-xl gap-y-3'>
        <h1 className='my-12 text-2xl font-bold text-center md:text-3xl'>{title}</h1>
        {data.content.length === 0 ? (
          <div className='flex flex-col items-center justify-center w-full h-96 gap-y-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
            <h1 className='text-xl font-bold'>결과가 없습니다.</h1>
            <Link to='/'>
              <button className='btn btn-outline'>물건 보러 가기</button>
            </Link>
          </div>
        ) : (
          Array.isArray(data.content) &&
          data.content.map((item) => {
            const cardProps = purchaseHistoryMatch
              ? { traded_before: item!.traded_before }
              : { uploaded_before: item!.uploaded_before };

            return (
              <CardListItem
                key={item.goods_id}
                id={item.goods_id}
                img={item.goods_thumbnail}
                name={item.goods_name}
                price={item.price}
                status={item.goods_status}
                {...cardProps}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}
