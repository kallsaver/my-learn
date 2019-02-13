# 和其他语言不同,python中可以在while和for循环中使用else语句
# 在循环中使用时,else子句只在循环完成后执行,也就是说break语句执行了会跳过else块

for n in range(2, 10):
    print(n)
    # else是属于for循环的,会在完整循环结束时执行
    # 当for循环中出现了break语句,那么else将不会被执行了
    # 在函数体里面才能使用return
    if n == 3:
        #pass 
        break
else:
    print('else子句执行')


a = 2
while a < 10:
    print(a)
    if a == 3:
        # pass 
        break
    a += 1
else:
    print('else子句执行')