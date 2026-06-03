import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = process.env.LOGIN_USER;
  const pwd = process.env.LOGIN_PWD;

  if (username === user && password === pwd) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
}
