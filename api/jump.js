import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // 1. 获取 key 参数
    const key = req.query.key || '';
    if (!key) {
      return res.status(400).send('缺少 key 参数');
    }

    // 2. 从 redis 读取数据
    const stunList = await redis.get('stun_list') || {};
    const value = stunList[key];

    if (!value) {
      return res.status(404).send('key 不存在');
    }

    // 3. 判断是否为有效 URL
    let isUrl = false;
    try {
      const url = new URL(value);
      isUrl = url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {}

    // 4. 是 URL → 302 跳转
    if (isUrl) {
      return res.redirect(302, value);
    }

    // 5. 不是 URL → 直接返回文本
    return res.status(200).setHeader('Content-Type', 'text/plain').send(value);

  } catch (err) {
    return res.status(500).send('服务异常');
  }
}
