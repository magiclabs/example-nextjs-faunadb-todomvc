import { createHandlers } from '../../lib/rest-utils'
import { TodoModel } from '../../lib/models/todo-model'
import { getSession } from '../../lib/auth-cookies'

const handlers = {
  GET: async (req, res) => {
    const { token } = await getSession(req)
    const todoModel = new TodoModel(token)
    const todo = await todoModel.getTodo(req.query.id)
    res.status(200).json({ todo })
  },

  POST: async (req, res) => {
    const { token } = await getSession(req)
    const { title } = JSON.parse(req.body)
    const todoModel = new TodoModel(token)
    const id = await todoModel.addTodo(title)
    res.status(200).json({ id })
  },

  PATCH: async (req, res) => {
    const { token } = await getSession(req)
    const todoModel = new TodoModel(token)
    const data = JSON.parse(req.body)
    await todoModel.updateTodo(req.query.id, data)
    res.status(200).json({ done: true })
  },

  DELETE: async (req, res) => {
    const { token } = await getSession(req)
    const todoModel = new TodoModel(token)
    await todoModel.deleteTodo(req.query.id)
    res.status(200).json({ done: true })
  },
}

export default function todo(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
