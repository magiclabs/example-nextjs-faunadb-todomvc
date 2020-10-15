import { createHandlers } from '../../lib/rest-utils'
import { TodoModel } from '../../lib/models/todo-model'
import { getSession } from '../../lib/auth-cookies'

const handlers = {
  GET: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    const todos = await model.getAllTodos()
    res.status(200).json({ todos })
  }
}

export default function todos(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
