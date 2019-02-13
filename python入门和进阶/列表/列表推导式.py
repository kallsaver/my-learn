# math是自带的包,不用安装
from math import pi

# 列表推导式由包含一个表达式的括号组成,如果只有一个语句可省略括号(如果迭代结果是本身都省略)
# 表达式后面跟随一个for子句
# 之后可以有零或多个for或if子句.
# 结果是一个列表,由表达式依据其后面的for和if子句上下文计算而来的结果构成
# 使用列表推导式的好处是不会产生全局变量并且可读性好

# 最简单的列表推导式 
squares = [x ** 2 for x in range(10)]
print(squares)

# 之后跟随一个for子句,(x, y)的相当包了一层((x, y))
# 多个子句,从左到右包裹上下文(是嵌套的for循环而不是嵌套的列表推导式关系)
double = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
print('double', double)

# 等同于
combs = []
for a in [1, 2, 3]:
    for b in [3, 1, 4]:
        if a != bytearray:
            combs.append((a, b))
print('combs', combs)

# 然而使用这种方法会有变量污染
# x,y在循环完毕依然存在,x,y是全局变量
print('a', a)
print('b', b)

# 事实上,列表推导式把for函数体的子句提前写在表达式里,
# 最终返回一个列表,列表元素由表达式的返回值构成
d = [print(x) or x ** 2 for x in [1, 2, 3]]
print('d', d)


circle = [str(round(pi, i)) for i in range(1, 6)]

print(circle)

# 当迭代时需要修改内部元素,使用副本
# 可以不是用列表推导式的返回值
words = ['cat', 'window', 'defenestrate']
[words.insert(0, w) for w in words[:] if len(w) > 6]
print(words)

# 实现3X4的矩阵的行和列的交换
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

# 嵌套的列表推导式 会产生二维数组
# 嵌套的列表推导式需要先找到父列表推导式(右边),进行传参,逐个执行子列表推导式
nesting = [[row[i] for row in matrix] for i in range(4)]
print('nesting', nesting)

# 等价于
transposed = []
for i in range(4):
    transposed.append([row[i] for row in matrix])

print(transposed)

# 等价于
simple = []
for i in range(4):
    simple_row = []
    for row in matrix:
        simple_row.append(row[i])
    simple.append(simple_row)

print(simple)

# 使用zip(*)解压成元组形式
# python3 zip函数返回一个可迭代的对象
tu = list(zip(*matrix))

# 提取[1, 3, 5, 7]
arr = [1, 2, 3, 4, 5, 6, 7, 8]

# 使用列表推导式
result1 = [arr[i] for i in range(0, len(arr), 2)]
print(result1)

# 使用切片
result2 = arr[0:len(arr):2]
print(result2)





