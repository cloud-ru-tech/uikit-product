import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { generateRows } from './helpers';
import { StubData } from './types';

export function useInfiniteLoading({
  rowsAmount,
  infiniteLoading,
  filteredData,
  setFilteredData,
  includeStatus,
  dataError,
}: {
  rowsAmount: number;
  infiniteLoading?: boolean;
  filteredData: StubData[];
  setFilteredData: Dispatch<SetStateAction<StubData[]>>;
  includeStatus?: boolean;
  dataError?: boolean;
}) {
  const observer = useRef<IntersectionObserver>();
  const timeout = useRef<NodeJS.Timeout>();

  const scrollRef = useRef<HTMLElement>(null);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const rowsAmountForInfiniteLoading = rowsAmount + 20;

  useEffect(() => {
    if (!infiniteLoading) return;

    if (filteredData.length > rowsAmountForInfiniteLoading) {
      setHasMore(false);
      setLoading(false);
      clearTimeout(timeout.current);
      return;
    }
  }, [rowsAmountForInfiniteLoading, filteredData.length, infiniteLoading]);

  const fetchMore = useCallback(async () => {
    if (dataError || !filteredData.length || filteredData.length > rowsAmountForInfiniteLoading) {
      return;
    }

    setLoading(true);
    timeout.current = setTimeout(() => {
      setFilteredData(items => items.concat(generateRows(10, includeStatus)));

      setLoading(false);
    }, 2000);
  }, [dataError, filteredData.length, includeStatus, rowsAmountForInfiniteLoading, setFilteredData]);

  useEffect(() => {
    if (!infiniteLoading) return;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting && hasMore && !loading) {
        fetchMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      observer.current.observe(scrollRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, hasMore, infiniteLoading, loading]);

  return {
    loading,
    scrollRef,
  };
}
