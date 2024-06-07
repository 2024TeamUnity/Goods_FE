import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Observer({
  loadMore,
  hasNext,
}: {
  loadMore: () => Promise<InfiniteQueryObserverResult>;
  hasNext: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 1, delay: 500 });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);
  return (
    <div>
      {hasNext ? (
        <div className='text-center'>
          <span ref={ref} className='my-5 loading loading-spinner loading-lg' />
        </div>
      ) : (
        <div className='my-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='w-16 h-16 bi bi-dot fill-neutral-content'
            viewBox='0 0 16 16'
          >
            <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' />
          </svg>
        </div>
      )}
    </div>
  );
}
