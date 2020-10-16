import { getSession } from '../../lib/auth-cookies'

export default async function user(req, res) {
  const session = await getSession(req)

  if (session) {
    const { email, issuer } = session
    res.status(200).json({ user: { email, issuer } })
  } else {
    res.status(200).json({ user: null })
  }
}
