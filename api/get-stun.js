import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false });
  const data = await redis.get('stun_map') || {};
  return res.json({ success: true, data });
}
