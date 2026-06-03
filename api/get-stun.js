import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
const SECRET = process.env.API_SECRET;

export default async function handler(req, res) {
  const auth = req.headers.authorization || '';
  const needAuth = !!auth;
  if(needAuth && auth !== `Bearer ${SECRET}`){
    return res.status(401).json({success:false,msg:'密钥错误'})
  }
  const data = await redis.get('stun_list') || {};
  res.json({ success: true, data });
}
