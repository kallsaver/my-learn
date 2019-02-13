# enumerate函数
a = enumerate(['tic', 'tac', 'toe'])

# class enumerate
print(type(a))

# enumerate是没有subscriptable(下标)的
print(a)

# 希望或者列表的索引值
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)

# 循环中若需要修改正在遍历的序列,应该使用副本
words = ['cat', 'window', 'defenestrate']
for w in words[:]:
    if len(w) > 6:
        words.insert(0, w)
print(words)

# 列表的循环经常使用range和len,这样就可以获取索引了
# 例如遍历所有的项: for i in range(0, len(list))

arr = [1, 2, 3, 4, 5, 6, 7, 8]
# 提取[1, 3, 5, 7]
# 使用等差为2的数列更高效,相当于其他语言的i+=2
result = []
for i in range(0, len(arr), 2):
    result.append(arr[i])
print(result)