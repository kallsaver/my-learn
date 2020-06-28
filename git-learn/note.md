分支
------------

列出所有分支
git branch -a

切换到某分支
git checkout [branch name]
切换之前要git commit -m [description]到当前分支的git本地仓库

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
git reset --soft HEAD^

标签
------------
标签是一个不变的分支,它只是指向某次提交的指针
一般在master分支发布版本是会打个标签

查看所有的标签
git tag 111(bug)

注释标签
git tag -a [tagName] -m "[description]"
