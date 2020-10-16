import React, { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllTodos } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Spinner from '../components/spinner'
import AddTodo from '../components/add-todo'
import TodoItem from '../components/todo-item'

export default function Home() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser()
  const { todos, loading: todosLoading, mutate: mutateTodos } = useAllTodos()
  const [initialized, setInitialized] = useState(false)
  const isFirstRender = useFirstRender()
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed

      case 'completed':
        return todo.completed

      case 'all':
      default:
        return true
    }
  })

  useEffect(() => {
    // Flag initialization complete,
    // this will change hide the loading state.
    if (user && !userLoading && !todosLoading && !initialized) {
      setInitialized(true)
    }
  }, [user, userLoading, todosLoading, initialized])

  useEffect(() => {
    // If no user is logged in, redirect
    // to the `/login` page automatically.
    if (!(user || userLoading) && !isFirstRender) {
      router.push('/login')
    }
  }, [user, userLoading])

  return (
    <Layout>
      {initialized ? <>
        <AddTodo todos={todos} mutateTodos={mutateTodos} />
        {filteredTodos.map(todo => <TodoItem mutateTodos={mutateTodos} {...todo} key={todo.id} /> )}
        {!!todos.length && (<div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        </div>)}
      </> : <div className="spinner-wrapper">
        <Spinner />
      </div>}

      <style jsx>{`
        .spinner-wrapper {
          display: flex;
          justify-content: center;
          padding: 3rem;
        }

        .filters {
          display: flex;
          justify-content: center;
          border-top: solid 1px #eeeeee;
          padding: 10px;
        }

        .filters button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #bdbdbd;
          border-radius: 4px;
          box-shadow: 0 0 0 3px transparent;
          transition: all 0.2s;
        }

        .filters button:hover {
          border-color: #6851ff;
        }

        .filters button:focus {
          outline: none;
          border-color: #6851ff;
          box-shadow: 0 0 0 3px #e2dcff;
        }

        .filters button:active,
        .filters button.active {
          outline: none;
          border-color: #6851ff;
          box-shadow: 0 0 0 3px #a796ff;
        }

        .filters button:not(:last-child) {
          margin-right: 10px;
        }
      `}</style>
    </Layout>
  )
}
