import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { IObserver } from '../../types/interface';
import { useMatch } from 'react-router-dom';

export default function Observer({ loadMore, hasNext }: IObserver) {
  const { ref, inView } = useInView({ threshold: 1, delay: 500 });
  const isChatRoom = useMatch('/room/:roomId');

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);
  return (
    <div className='flex items-center justify-center'>
      {hasNext && (
        <div className='text-center'>
          <span ref={ref} className='my-5 loading loading-spinner loading-lg' />
        </div>
      )}
      {!hasNext && !isChatRoom && (
        <div className='my-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            fill='currentColor'
            className='w-12 h-12 bi bi-dot fill-neutral-content'
            viewBox='0 0 16 16'
          >
            <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' />
          </svg>
        </div>
      )}
    </div>
  );
}
