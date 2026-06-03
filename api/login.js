import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { username, password } = req.body;
  const correctUser = process.env.LOGIN_USER;
  const correctPwd = process.env.LOGIN_PWD;

  if (username === correctUser && password === correctPwd) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
}
