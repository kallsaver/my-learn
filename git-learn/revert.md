场景: master线上分支出现紧急bug,需要回滚到某个commit

方案1: 在hotfix分支用revert生产新的commit

1.git checkout hotfix
2.git merge master
3.git log看提交commit_id或者git reflog(简写的commit_id)
4.git revert commit_id(完整的或者简写的都行)
5.解决冲突后 git add -A
6.git commit -m "[description]"
7.git push origin hotfix
8.git checkout master
9.git merge hotfix
10.get push origin master
