arr = [1, 2, 3, 4, 5, 6, 7, 8]

# 从索引0到索引3之间的元素
b = arr[0:3]
print(b)

c = arr[0:3:5]
print(c)

# 提取[1, 3, 5, 7]
# 使用for循环
result1 = []
for i in range(0, len(arr), 2):
    result1.append(arr[i])
print(result1)

# 使用切片
# 切片的参数和range的参数一样
result2 = arr[0:len(arr):2]
print(result2)