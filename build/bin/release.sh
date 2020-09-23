#!/usr/bin/env sh

echo ">>>>>> start push <<<<<<"
echo " ====== 当前分支 ====== "

git checkout master

# select-version-cli 一个简单的cli来帮助您选择发布版本
VERSION=`npx select-version-cli`

read -p "发布版本 $VERSION - 确定? (y/n)" -n 1 -r
echo    # 输出一个新行

if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "发布版本 $VERSION ..."

  # build
  VERSION=$VERSION npm run dist

  # publish
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish
  git push -u origin master
  git push
  npm publish
fi
