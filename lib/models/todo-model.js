import { q, getClient } from '../faunadb'

export class TodoModel {
  constructor(token) {
    this.client = getClient(token);
  }

  getAllTodos() {
    return this.client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_todos'))),
        q.Lambda('X', {
          id: q.Select(['ref', 'id'], q.Get(q.Var('X'))),
          title: q.Select(['data', 'title'], q.Get(q.Var('X'))),
          completed: q.Select(['data', 'completed'], q.Get(q.Var('X'))),
        })
      )
    )
  }

  async addTodo(title) {
    const user = q.Identity();
    const newTodo = { title, user, completed: false };

    const res = await this.client.query(
      q.Create(q.Collection('todos'), {
        data: newTodo,
        permissions: { read: user, write: user },
      })
    )

    return res.ref.id
  }

  async getTodo(id) {
    return this.client.query(
      q.Let(
        { user: q.Get(q.Ref(q.Collection('todos'), id)) },
        {
          id: q.Select(['ref', 'id'], q.Var('user')),
          title: q.Select(['data', 'title'], q.Var('user')),
          completed: q.Select(['data', 'completed'], q.Var('user'))
        }
      )
    )
  }

  async updateTodo(id, { title, completed }) {
    await this.client.query(
      q.Update(q.Ref(q.Collection('todos'), id), {
        data: { title, completed }
      })
    )
  }

  async deleteTodo(id) {
    await this.client.query(
      q.Delete(q.Ref(q.Collection('todos'), id))
    )
  }
}
