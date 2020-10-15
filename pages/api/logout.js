import { magic } from '../../lib/magic'
import { getClient, q } from '../../lib/faunadb'
import { getSession, removeSession } from '../../lib/auth-cookies'

export default async function logout(req, res) {
  const { token, issuer } = await getSession(req)
  const client = getClient(token)

  await Promise.all([
    client.query(q.Logout()),
    magic.users.logoutByIssuer(issuer)
  ])

  removeSession(res)

  res.writeHead(302, { Location: '/' })
  res.end()
}
