import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs'; 
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { username, password } = req.body;
  const user = process.env.LOGIN_USER;
  const hash = process.env.LOGIN_PWD_HASH;

  const isPwdOk = bcrypt.compareSync(password, hash);

  if (username === user && isPwdOk) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
}
