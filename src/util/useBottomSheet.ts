import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import usePreviousValue from './usePreviousValue';
import { useRecoilState } from 'recoil';
import { isOpenBottomSheetState } from '../store/atom';

const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenBottomSheetState);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = (info: PointerEvent) => {
    const shouldClose = info.y > 45;

    if (shouldClose) {
      controls.start('hidden');
      setIsOpen(false);
    } else {
      controls.start('visible');
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen]);

  return { onDragEnd, controls, setIsOpen, isOpen };
};

export default useBottomSheet;
