import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { ICardListItemProps } from '../../types/interface';
import AddWishListButton from './AddWishListButton';
import { getTime } from '../../util/getTime';
import RatingModal from './RatingModal';
import { addComma } from '../../util/addComma';

export default function CardListItem({
  id,
  img,
  name,
  status,
  price,
  uploaded_before,
  traded_before,
}: ICardListItemProps) {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const purchaseHistoryMatch = useMatch('/purchase-history');
  const wishHistoryMatch = useMatch('/wish-history');

  const handleOpenModal = () => {
    setIsOpen(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <li
        key={id}
        className={`flex flex-col w-full transition-all duration-200 scale-95 border rounded-xl gap-y-3 hover:scale-105 ${
          showModal && 'bg-neutral-400'
        }`}
      >
        <Link to={`/posts/${id}`} className='flex items-center justify-start p-4 gap-x-8'>
          <img className='object-cover w-24 h-24 rounded-xl md:w-32 md:h-32' src={img} alt='img' />
          <div className='relative flex flex-col flex-1 py-2'>
            <p className='text-lg font-bold'>{name}</p>
            <p className='flex-1 mt-2 mb-4 text-sm text-neutral-500'>
              {getTime(purchaseHistoryMatch ? traded_before! : uploaded_before!)}
            </p>
            <div className='flex items-center justify-start text-base gap-x-2'>
              {status === '판매중' && (
                <div className='flex items-center justify-center w-16 p-1 text-sm text-white bg-secondary rounded-xl'>
                  {status}
                </div>
              )}
              {status === '예약중' && (
                <div className='flex items-center justify-center w-16 p-1 text-sm text-white bg-neutral-500 rounded-xl'>
                  {status}
                </div>
              )}
              {status === '거래완료' && (
                <div className='flex items-center justify-center w-16 p-1 text-sm text-white bg-neutral rounded-xl'>
                  {status}
                </div>
              )}
              <span className='font-bold'>{addComma(String(price))}원</span>
            </div>
            {wishHistoryMatch && (
              <div className='absolute right-2 top-2'>
                <AddWishListButton goodsId={id} wish />
              </div>
            )}
          </div>
        </Link>
        {purchaseHistoryMatch && (
          <button
            onClick={handleOpenModal}
            className='bottom-0 left-0 w-full btn btn-active btn-neutral'
            disabled={isSubmit}
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
            <span>{isSubmit ? '등록 완료' : '후기 등록'}</span>
          </button>
        )}
      </li>
      <RatingModal
        id={id}
        isOpen={isOpen}
        closeModal={handleCloseModal}
        setIsSubmit={() => setIsSubmit(true)}
      />
    </>
  );
}
