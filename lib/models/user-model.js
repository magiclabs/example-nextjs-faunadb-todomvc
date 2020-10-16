import { q, adminClient, getClient } from '../faunadb'

export class UserModel {
  async createUser(email, issuer) {
    return adminClient.query(q.Create(q.Collection("users"), {
      /**
       * FaunaDB has built-in password-based authentication. Because we rely on
       * the DID token to authenticate users, we just need a unique string to be
       * the user's "password". In our case, we use the DID token `issuer` field.
       */
      credentials: { password: issuer },
      data: { email },
    }))
  }

  async getUserByEmail(email) {
    return adminClient.query(
      q.Get(q.Match(q.Index("users_by_email"), email))
    ).catch(() => undefined)
  }

  async obtainFaunaDBToken(user, issuer) {
    return adminClient.query(
      q.Login(q.Select("ref", user), { password: issuer })
    ).then(res => res?.secret).catch(() => undefined)
  }

  async invalidateFaunaDBToken(token) {
    await getClient(token).query(q.Logout(true))
  }
}
