import { useCallback, useEffect, useRef } from 'react'
import useSWR from 'swr'
import { get } from 'lodash'

const jsonFetcher = (selector) => (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => selector ? get(data, selector, null) : data ?? null)

export function useAllTodos() {
  const { data, isValidating, mutate } = useSWR('/api/todos', jsonFetcher('todos'))
  return { todos: data ?? [], loading: isValidating, mutate }
}

export function useUser() {
  const { data, isValidating } = useSWR('/api/user', jsonFetcher())
  const user = data?.user ?? null;
  return { user, loading: isValidating };
}

export function useIsMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
