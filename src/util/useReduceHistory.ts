import { InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useReduceHistory = <T>(data: InfiniteData<T[]>) => {
  const history = useMemo(() => {
    if (data) {
      return data.pages.reduce((acc, cur) => [...acc, ...cur], []);
    }
  }, [data]);
  return history;
};