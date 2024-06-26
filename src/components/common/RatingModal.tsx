import React, { useState } from 'react';
import { useSendReviewMutation } from '../../service/mypage/useSendReviewMutation';
import Modal from './Modal';

export default function RatingModal({
  id,
  isOpen,
  closeModal,
}: {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [rating, setRating] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.currentTarget.dataset.score));
  };

  const sendReview = useSendReviewMutation(closeModal);

  const handleCancelBtn = () => {
    closeModal();
    setRating(5);
  };

  const handleSubmitReview = () => {
    sendReview({ goodsId: id, star: rating! });
    handleCancelBtn();
  };

  return (
    <Modal
      isOpen={isOpen}
      title='거래 후기'
      keyword='거래 후기를'
      hasSubmit
      isEmpty={!rating}
      handleSubmit={handleSubmitReview}
      handleCloseModal={handleCancelBtn}
      confirmBtnMsg='후기 등록'
    >
      <div className='flex items-center justify-center rating rating-lg rating-half rate-container'>
        <div className='rating rating-lg rating-half'>
          <input type='radio' name='rating-10' className='rating-hidden' />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-1'
            data-score={0.5}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-2'
            data-score={1}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-1'
            data-score={1.5}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-2'
            data-score={2}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-1'
            data-score={2.5}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-2'
            data-score={3}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-1'
            data-score={3.5}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-2'
            data-score={4}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-1'
            data-score={4.5}
            onChange={handleChange}
          />
          <input
            type='radio'
            name='rating-10'
            className='bg-yellow-500 mask mask-star-2 mask-half-2'
            data-score={5}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  );
}
