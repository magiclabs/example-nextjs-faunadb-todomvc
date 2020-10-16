import { createHandlers } from '../../lib/rest-utils'
import { TodoModel } from '../../lib/models/todo-model'
import { getSession } from '../../lib/auth-cookies'

const handlers = {
  GET: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    const todos = await model.getAllTodos()
    res.status(200).json({ todos })
  },

  PATCH: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    const data = JSON.parse(req.body)
    await model.updateAllTodos(data)
    res.status(200).json({ done: true })
  },

  DELETE: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    await model.deleteCompletedTodos()
    res.status(200).json({ done: true })
  },
}

export default function todos(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
