import { createHandlers } from '../../lib/rest-utils'
import { TodoModel } from '../../lib/models/todo-model'
import { getSession } from '../../lib/auth-cookies'

const handlers = {
  GET: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    const todo = await model.getTodo(req.query.id)
    res.status(200).json({ todo })
  },

  POST: async (req, res) => {
    const { token } = await getSession(req)
    const { title } = JSON.parse(req.body)
    const model = new TodoModel(token)
    const id = await model.addTodo(title)
    res.status(200).json({ id })
  },

  PATCH: async (req, res) => {
    const { token } = await getSession(req)
    const data = JSON.parse(req.body)
    const model = new TodoModel(token)
    await model.updateTodo(req.query.id, data)
    res.status(200).json({ done: true })
  },

  DELETE: async (req, res) => {
    const { token } = await getSession(req)
    const model = new TodoModel(token)
    await model.deleteTodo(req.query.id)
    res.status(200).json({ done: true })
  }
}

export default function todo(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
