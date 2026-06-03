import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const token = req.headers.authorization;
  const correctToken = process.env.API_TOKEN;

  if (token && token !== correctToken) {
    return res.status(401).json({ success: false });
  }

  const data = await redis.get('stun_list') || {};
  res.json({ success: true, data });
}
