import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // ✅ 正确：从 /j/xxx 拿到 xxx
    const key = req.query.key;

    if (!key) {
      return res.status(400).send("缺少key");
    }

    // ✅ 从你的 stun_list 读取
    const stun_list = await redis.get("stun_list") || {};
    const value = stun_list[key];

    if (!value) {
      return res.status(404).send("key不存在");
    }

    // 判断是否为 URL
    let isUrl = false;
    try {
      const url = new URL(value);
      isUrl = url.protocol === "http:" || url.protocol === "https:";
    } catch {}

    // 是 URL → 302 跳转
    if (isUrl) {
      return res.redirect(302, value);
    }

    // 不是 → 直接返回文本
    return res.status(200).setHeader("Content-Type", "text/plain; charset=utf-8").send(value);

  } catch (err) {
    return res.status(500).send("错误");
  }
}
