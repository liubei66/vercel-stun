import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const token = req.headers.authorization;
  const API_TOKEN = process.env.API_TOKEN;

  let allowed = false;

  if (token === API_TOKEN) {
    allowed = true;
  } else {
    const valid = await redis.get(`login:${token}`);
    if (valid === 'ok') allowed = true;
  }

  if (!allowed) {
    return res.status(401).json({ success: false, msg: '请登录' });
  }

  const data = await redis.get('stun_list') || {};
  res.json({ success: true, data });
}
