import useBottomSheet from '../../util/useBottomSheet';
import { motion } from 'framer-motion';

export default function BottomSheetHeader() {
  const { isOpen, setIsOpen } = useBottomSheet();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className='h-[48px] cursor-pointer bg-white rounded-t-xl shadow-md relative pt-4 flex justify-center items-center  pb-1'
    >
      <motion.svg
        animate={{ rotateZ: isOpen ? 0 : -180 }}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='mb-3 size-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5'
        />
      </motion.svg>
    </div>
  );
}
