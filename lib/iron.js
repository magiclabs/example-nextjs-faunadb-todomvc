import Iron from '@hapi/iron'

export async function encrypt(data) {
  return data && Iron.seal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
}

export async function decrypt(data) {
  return data && Iron.unseal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
}
