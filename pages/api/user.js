import { getSession } from '../../lib/auth-cookies'

export default async function user(req, res) {
  const { email, issuer } = await getSession(req)
  res.status(200).json({ user: { email, issuer } || null })
}
