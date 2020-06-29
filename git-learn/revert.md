场景: master线上分支出现紧急bug,需要回滚到某个commit

方案1: 发布部署时不再使用master分支,而是修改bug后的tag分支
git checkout -b [new branch name] [tag name]
# 或者git checkout -b [branch name] [commit id]
git push -u origin [new branch name]

方案2: 重写master
1.把代码切换到某次commit
git checkout -b [new branch name] [tag name]
# 或者git checkout -b [new branch name] [commit id]

2.git reset master

3.git checkout master

3.git add -A

4.git commit -m "[description]"

5.这是一个bug
