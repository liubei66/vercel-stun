import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const data = await redis.get('stun_list') || {};
  res.json({ success: true, data });
}
