# 1. 创建README.md文件（项目说明文档）
echo "# Frontend" >> README.md
# 2. 初始化本地Git仓库
git init
# 3. 把README.md添加到暂存区
git add README.md
# 4. 提交到本地仓库（备注首次提交）
git commit -m "first commit"
# 5. 将本地分支改名为main（GitHub默认分支名）
git branch -M main
# 6. 关联这个远程仓库（命名为origin）
git remote add origin https://github.com/cnjzh/Frontend.git
# 7. 推送到远程仓库，并绑定上游分支
git push -u origin main