export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false });

  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ success: false });

    let map = await process.env.KV.get('stun_map') || {};
    delete map[key];
    await process.env.KV.put('stun_map', map);

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ success: false });
  }
}
