场景: master线上分支出现紧急bug,需要回滚到某个commit

方案1: 发布部署时不再使用master分支,而是修改bug后的tag分支
git checkout -b [new branch name] [tag name]
# 或者git checkout -b [branch name] [commit id]
git push -u origin [new branch name]

方案2: 重写master
把代码切换到某次commit
1.git checkout -b [new branch name] [tag name]
# 或者git checkout -b [new branch name] [commit id]

reset默认参数是--mixed,会把这个commit的变更写入工作区,暂存区此时为空
2.git reset master

把工作区带入master,即把当前master的工作区修成master未commit那时候
3.git checkout master

重新变更添加到暂存区
3.git add -A

重新提交生成新的commit id
4.git commit -m "[description]"

push到master分支
5.git push origin master

删除临时分支
6.git branch -d [new branch name]

切换到dev,修复bug
7.git checkout dev
