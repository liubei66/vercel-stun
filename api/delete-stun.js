import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
const SECRET = process.env.API_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({success:false});
  const auth = req.headers.authorization || '';
  if(auth && auth !== `Bearer ${SECRET}`){
    return res.status(401).json({success:false,msg:'密钥错误'})
  }
  const { key } = req.body;
  const data = await redis.get('stun_list') || {};
  delete data[key];
  await redis.set('stun_list', data);
  res.json({ success: true });
}
