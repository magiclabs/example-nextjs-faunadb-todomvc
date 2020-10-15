import { useEffect } from 'react';
import useSWR from 'swr'
import { get } from 'lodash';

const jsonFetcher = (selector) => (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => selector ? get(data, selector, null) : data ?? null)

export function useAllTodos() {
  const { data, error } = useSWR('/api/todos', jsonFetcher('todos'))
  return error ? null : data
}

export function useTodo(id) {
  const { data, error } = useSWR(`/api/todo?id=${encodeURIComponent(id)}`, jsonFetcher('todo'))
  return error ? null : data
}

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { data, error } = useSWR('/api/user', jsonFetcher())
  const user = data?.user;
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}
