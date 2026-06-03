import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false });

  const token = req.headers.authorization;
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).json({ success: false });
  }

  const { key, value } = req.body;
  if (!key || !value) return res.status(400).json({ success: false });

  const map = await redis.get('stun_map') || {};
  map[key] = value;
  await redis.set('stun_map', map);

  return res.json({ success: true });
}
