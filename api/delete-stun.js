import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const token = req.headers.authorization;
  const correctToken = process.env.API_TOKEN;

  if (token !== correctToken) {
    return res.status(401).json({ success: false });
  }

  const { key } = req.body;
  const data = await redis.get('stun_list') || {};
  delete data[key];
  await redis.set('stun_list', data);

  res.json({ success: true });
}
