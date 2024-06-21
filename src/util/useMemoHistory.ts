import { InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useMemoHistory = <T>(data: InfiniteData<T[]>) => {
  const history = useMemo(() => {
    if (data) {
      return data.pages.reduce((acc, cur) => [...acc, ...cur], []);
    }
  }, [data]);
  return history;
};

export const useMemoHistoryReverse = <T>(data: InfiniteData<T[]>) => {
  const history = useMemo(() => {
    if (data) {
      return data.pages.reduce((acc, cur) => [...cur, ...acc], []);
    }
  }, [data]);
  return history;
};
