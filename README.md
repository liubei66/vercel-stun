环境变量（Vercel 设置）
LOGIN_USER=admin
LOGIN_PWD=你的密码
API_TOKEN=自定义一个长密钥（如：abc123xyz456）


CURL 命令
获取

curl https://xxx.vercel.app/api/get-stun \
-H "Authorization: 你的API_TOKEN"

添加
curl -X POST https://xxx.vercel.app/api/update-stun \
-H "Content-Type: application/json" \
-H "Authorization: 你的API_TOKEN" \
-d '{"key":"家庭NAS","value":"stun:xxx:3478"}'

删除
curl -X POST https://xxx.vercel.app/api/delete-stun \
-H "Content-Type: application/json" \
-H "Authorization: 你的API_TOKEN" \
-d '{"key":"家庭NAS"}'
