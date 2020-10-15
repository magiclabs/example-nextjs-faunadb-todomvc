import Iron from '@hapi/iron'

// Use an environment variable here instead of a hardcoded value for production
const TOKEN_SECRET = 'this-is-a-secret-value-with-at-least-32-characters'

export async function encrypt(data) {
  return data && Iron.seal(data, TOKEN_SECRET, Iron.defaults)
}

export async function decrypt(data) {
  return data && Iron.unseal(data, TOKEN_SECRET, Iron.defaults)
}
