import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search])
  console.log(search)
  return searchParams;
}