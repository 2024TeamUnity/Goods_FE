import { IBottomSheet } from '../../types/interface';
import useBottomSheet from '../../util/useBottomSheet';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHeader from './BottomSheetHeader';
import { motion } from 'framer-motion';
import HomeListItem from '../home/HomeListItem';
import Observer from '../common/Observer';

export default function BottomSheet({ products, hasNext, loadMore }: IBottomSheet) {
  const { onDragEnd, controls, setIsOpen, isOpen } = useBottomSheet();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`block md:hidden ${
        isOpen && 'bg-[rgba(0,0,0,.7)] z-40 absolute top-0 left-0 w-full h-screen'
      }`}
      onClick={() => isOpen && setIsOpen(false)}
    >
      <motion.div
        drag='y'
        onDragEnd={onDragEnd}
        initial='hidden'
        animate={controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 100 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.7}
        className={`flex-col block md:hidden m-auto fixed z-30 top-14 left-0 right-0 rounded-t-xl bg-white shadow-lg `}
      >
        <BottomSheetHeader />
        <BottomSheetContent>
          <HomeListItem products={products} />
          <Observer hasNext={hasNext} loadMore={loadMore} />
        </BottomSheetContent>
      </motion.div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        onClick={() => setIsOpen(true)}
        className='absolute z-20 flex items-center justify-center w-12 h-12 text-sm text-white transition-colors duration-200 bg-black rounded-full cursor-pointer md:hidden bottom-5 left-5 md:p-4 md:bottom-8 md:left-8 hover:bg-neutral-700'
      >
        리스트
      </div>
    </div>
  );
}
