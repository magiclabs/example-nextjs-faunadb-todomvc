import { getSession, removeSession } from '../../lib/auth-cookies'
import { createHandlers } from '../../lib/rest-utils'
import { UserModel } from '../../lib/models/user-model'
import { Magic } from '@magic-sdk/admin'

const handlers = {
  GET: async (req, res) => {
    // We previously stored the user's FaunaDB token
    // and DID issuer into an encrypted session cookie.
    // We will retrieve that session with the `getSession` function.
    const { token, issuer } = await getSession(req)

    /* Step 5: Invalidate the user's token */
    const magic = new Magic(process.env.MAGIC_SECRET_KEY)
    const userModel = new UserModel()

    await Promise.all([
      userModel.invalidateFaunaDBToken(token),
      magic.users.logoutByIssuer(issuer),
    ])

    // As a final step, we'll clear our session cookie
    // (erasing it from the user's browser).
    removeSession(res)

    res.writeHead(302, { Location: '/' })
    res.end()
  },
}

export default function logout(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
