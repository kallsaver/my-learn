区域
------------
分为工作区(未add),暂存区(已add未commit),仓库区(已commit)

分支
------------

列出所有分支
git branch -a

切换到某分支
git checkout [branch name]
工作区的代码可以带入切换的分支,暂存区如果有代码必须先commit存放仓库区再能做切换

查看提交id和信息
------------

列出最近第n次提交的信息
git log [-n]
q退出展示表单

在一行内显示最近提交的信息
git log --pretty=oneline

放弃修改
------------
禁止使用git reset --hard [commit_id]回退版本

放弃本地的所有文件的修改(未commit)
git checkout .

放弃本地的某个文件的修改(未commit)
先查看文件名(git status有放弃修改的命令说明)
git status
git checkout -- [filename]

放弃已经commit未push的修改
先查看commit id
git log
git reset HEAD^(取消上一次commit,并且把变更的东西放入工作区)
git reset --soft HEAD^(取消上一次commit,并且把变更的东西放入暂存区, 相当于git reset HEAD^ 然后git add -A)

标签
------------
标签是一个不变的分支,它只是指向某次提交的指针
一般在master分支发布版本是会打个标签

查看所有的标签
git tag

共享标签
git add -A
git commit -m "[description]"
git tag [tag name]
git push origin master
git push origin [tag name]

共享本地未提交的所有标签
git push origin --tags

检出某个标签的提交
git checkout -b [new branch name] [tag name]

注释标签
git tag -a [tag name] -m "[description]"
