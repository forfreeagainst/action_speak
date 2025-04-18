#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "fix: pages菜单项下选择GithubActions"
git push origin main