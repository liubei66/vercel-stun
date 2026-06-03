export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false })

  const { username, password } = req.body
  const validUser = process.env.ADMIN_USER
  const validPwd = process.env.ADMIN_PWD

  if (!validUser || !validPwd) {
    return res.status(500).json({ success: false, msg: '未配置登录信息' })
  }

  if (username === validUser && password === validPwd) {
    return res.json({ success: true })
  }

  return res.json({ success: false })
}
