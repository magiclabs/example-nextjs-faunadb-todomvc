import { useUser, useAllTodos } from '../lib/hooks'
import Layout from '../components/layout'

const Profile = () => {
  const user = useUser();
  const todos = useAllTodos()

  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre>{JSON.stringify(todos, null, 2)}</pre>
        </>
      )}

      <button onClick={() => fetch('/api/todo', { method: 'POST', body: JSON.stringify({ title: 'hello' }) })}>add test todo</button>
      <button onClick={() => fetch('/api/todo?id=279478408983872008', { method: 'DELETE' })}>delete todo</button>
    </Layout>
  )
}

export default Profile
