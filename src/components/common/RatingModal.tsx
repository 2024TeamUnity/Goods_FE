import { useState } from 'react';
import { useSendReviewMutation } from '../../service/mypage/useSendReviewMutation';
import Modal from './Modal';

export default function RatingModal({
  id,
  isOpen,
  closeModal,
  setIsSubmit,
}: {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
  setIsSubmit: () => void;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [rateColor] = useState(null);

  const sendReview = useSendReviewMutation(setIsSubmit, closeModal);

  const handleCancelBtn = () => {
    closeModal();
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
      <div className='flex items-center justify-center gap-x-2'>
        {[...Array(5)].map((_, index) => {
          const currentRate = index + 1;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className='relative' key={index}>
              {' '}
              <label htmlFor='rate'>
                <input
                  value={currentRate}
                  onClick={() => setRating(currentRate)}
                  type='radio'
                  id='rate'
                  name='rate'
                  className='absolute opacity-0 size-6 left-1 top-3'
                />
                <span
                  className={`text-3xl ${
                    currentRate <= (rateColor || rating!) ? 'text-yellow-300' : 'text-neutral-400'
                  }`}
                >
                  {' '}
                  &#9733;
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
