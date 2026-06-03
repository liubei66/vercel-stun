import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
const SECRET = process.env.API_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST) return res.status(405).json({success:false});
  const auth = req.headers.authorization || '';
  if(auth && auth !== `Bearer ${SECRET}`){
    return res.status(401).json({success:false,msg:'密钥错误'})
  }
  const { key, value } = req.body;
  if (!key || !value) return res.json({ success: false });
  const data = await redis.get('stun_list') || {};
  data[key] = value;
  await redis.set('stun_list', data);
  res.json({ success: true });
}
