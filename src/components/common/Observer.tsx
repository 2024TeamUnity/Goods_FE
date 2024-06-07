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
        <h1 className='my-5 text-sm text-center md:text-lg'>마지막 페이지 입니다.</h1>
      )}
    </div>
  );
}
