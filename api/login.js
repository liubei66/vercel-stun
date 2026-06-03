import { Redis } from '@upstash/redis';
import bcrypt from 'bcrypt';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({success:false});
  const {username,password} = req.body;
  const user = process.env.LOGIN_USER;
  const hash = process.env.LOGIN_PWD_HASH;

  if(username === user && await bcrypt.compare(password, hash)){
    return res.json({success:true})
  }
  return res.json({success:false})
}
