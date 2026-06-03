import { kv } from '@vercel/kv'
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({success:false})
  try {
    const stunMap = await kv.get('stun_map') || {}
    return res.json({success:true,data:stunMap})
  }catch(e){
    return res.status(500).json({success:false})
  }
}
