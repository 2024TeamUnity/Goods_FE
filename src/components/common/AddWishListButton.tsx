import { useEffect, useState } from 'react';
import { useAddWishItemMutation } from '../../service/mypage/useAddWishItemMutation';
import { useRemoveWishItemMutation } from '../../service/mypage/useRemoveWishItemMutation';

export default function AddWishListButton({ goodsId, wish }: { goodsId: number; wish: boolean }) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useAddWishItemMutation();
  const removeItem = useRemoveWishItemMutation();

  useEffect(() => {
    setIsAdded(wish);
  }, [wish]);

  const handleLikeBtnClick = () => {
    if (!isAdded) {
      addItem({ goodsId });
      setIsAdded(true);
      return;
    }
    removeItem(goodsId);
    setIsAdded(false);
  };
  return (
    <button onClick={handleLikeBtnClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='primary'
        className={`w-8 h-8 stroke-primary ${isAdded && 'fill-primary'}`}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
        />
      </svg>
    </button>
  );
}
