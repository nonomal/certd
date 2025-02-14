#
set -e
echo "即将删除packages下除ui之外的其他目录，按y确认（如果您没有修改过源码，按y即可）"
read -p "y/n: " confirm
if [ $confirm != "y" ]; then
  echo "取消操作"
  exit 1
fi
find ./packages -mindepth 1 -maxdepth 1 -type d ! -name 'ui' -exec rm -rf {} +

echo "删除成功"

echo "安装pnpm 8.15.7, 前提是已经安装了nodejs"
npm install -g pnpm@8.15.7 --registry https://registry.npmmirror.com
echo "安装依赖"
pnpm install --registry https://registry.npmmirror.com

echo "开始构建"
echo "构建certd-client"
cd packages/ui/certd-client
npm run build
cp -r dist/* ../certd-server/public

echo "构建certd-server"
cd ../certd-server
npm run build
echo "构建完成"
echo "启动服务"
# 前台运行
npm run start

# 后台运行
# nohup npm run start &
