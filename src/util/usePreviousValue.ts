import { useEffect, useState } from 'react';

const usePreviousValue = (value: boolean) => {
  //   const previousValueRef = useRef<HTMLDivElement>(null);
  const [prev, setPrev] = useState(false);

  useEffect(() => {
    setPrev(value);
  }, [value]);

  return prev;
};

export default usePreviousValue;
