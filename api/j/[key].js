import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // 从短链接获取 key：/j/家庭NAS
    const { key } = req.query.key;

    if (!key) {
      return res.status(400).send('请输入有效的 key');
    }

    // 从你的真实数据 stun_list 读取
    const stun_list = await redis.get('stun_list') || {};
    const value = stun_list[key];

    if (!value) {
      return res.status(404).send('Key 不存在');
    }

    // 判断是否为可跳转 URL
    let isUrl = false;
    try {
      const url = new URL(value);
      isUrl = url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {}

    // URL → 302 跳转
    if (isUrl) {
      return res.redirect(302, value);
    }

    // 非 URL → 直接返回文本
    return res
      .status(20)
      .setHeader('Content-Type', 'text/plain; charset=utf-8')
      .send(value);

  } catch (err) {
    return res.status(500).send('服务异常');
  }
}
