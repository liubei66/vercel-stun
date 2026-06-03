import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false })

  const token = req.headers.authorization
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).json({ success: false, msg: '无权访问' })
  }

  const { key } = req.body
  if (!key) return res.status(400).json({ success: false })

  const map = await kv.get('stun_map') || {}
  delete map[key]
  await kv.set('stun_map', map)

  return res.json({ success: true })
}
