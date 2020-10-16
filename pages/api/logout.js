import { magic } from '../../lib/magic'
import { getClient, q } from '../../lib/faunadb'
import { getSession, removeSession } from '../../lib/auth-cookies'
import { createHandlers } from '../../lib/rest-utils'

const handlers = {
  GET: async (req, res) => {
    const { token, issuer } = await getSession(req)
    const client = getClient(token)

    await Promise.all([
      client.query(q.Logout(true)),
      magic.users.logoutByIssuer(issuer)
    ])

    removeSession(res)

    res.writeHead(302, { Location: '/' })
    res.end()
  }
}

export default function logout(req, res) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}
