import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
import { randomUUID } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { username, password } = req.body;
  const correctUser = process.env.LOGIN_USER;
  const correctPwd = process.env.LOGIN_PWD;

  if (username === correctUser && password === correctPwd) {
    const token = randomUUID();
    await redis.set(`login:${token}`, 'ok', { ex: 604800 });
    return res.json({ success: true, token });
  }

  return res.json({ success: false });
}
