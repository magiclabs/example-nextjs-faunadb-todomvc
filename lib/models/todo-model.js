import { q, getClient } from '../faunadb'

export class TodoModel {
  constructor(token) {
    this.client = getClient(token);
  }

  async getAllTodos() {
    return this.client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_todos'))),
        q.Lambda('todo_ref', {
          id: q.Select(['ref', 'id'], q.Get(q.Var('todo_ref'))),
          title: q.Select(['data', 'title'], q.Get(q.Var('todo_ref'))),
          completed: q.Select(['data', 'completed'], q.Get(q.Var('todo_ref'))),
        })
      )
    ).then(res => res.data)
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
    ).then(res => res.data)
  }

  async updateAllTodos({ title, completed }) {
    await this.client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_todos'))),
        q.Lambda('todo', q.Update(q.Var('todo'), {
          data: { title, completed }
        }))
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

  async deleteCompletedTodos() {
    await this.client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('todos_by_completed_state'), true)
        ),
        q.Lambda('todo', q.Delete(q.Var('todo')))
      )
    )
  }
}
