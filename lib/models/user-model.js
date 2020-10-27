import { q, adminClient, getClient } from '../faunadb'

export class UserModel {
  async createUser(email) {
    /* Step 4.3: Create a user in FaunaDB */
  }

  async getUserByEmail(email) {
    /* Step 4.3: Get a user by their email in FaunaDB */
  }

  async obtainFaunaDBToken(user) {
    /* Step 4.3: Obtain a FaunaDB access token for the user */
  }

  async invalidateFaunaDBToken(token) {
    /* Step 4.3: Invalidate a FaunaDB access token for the user */
  }
}
