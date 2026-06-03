import { kv } from '@vercel/kv'
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({success:false})
  const {key,value}=req.body
  if(!key||!value) return res.status(400).json({success:false})
  let map = await kv.get('stun_map')||{}
  map[key]=value
  await kv.set('stun_map',map)
  return res.json({success:true})
}
