

# python中的number数据类型有int和float,没有单精度和双精度
# /会得到float类型
# //在整除并且双方都是int会得到int类型
print(2 / 2)
type(print(2 / 2))
print(type(2 // 2))
print(type(2 // 2))

# list 列表
print(type([1]))

print('1是否在数组里', 1 in [1, 6])
print('1是否不在数组里', 1 not in [1, 6])

print(max([1, 6, 2]))
print(min([1, 6, 2]))
print(len([1, 6, 2]))
a = [[1], 2, []]

# a数组中把索引0~1之间的元素切片,返回给一个新的内存空间b
b = a[0:1]

# 浅拷贝
print(b[0] is a[0])

# 列表操作
arr = [1, 5]
arr.append(6)
print('arr', arr)

# tuple 元组 元组和数组的功能基本相同
# 不同的是元组不能改变里面的元素,但是可以整个元组可以用delete删除
print(type((1, 2, 3)))

# 当元组只有一个元素时需要加,
print(type((1,)))

# 集合set 集合是无序的,并且里面的元素是不会重复的
print(type({1, 2}))

# 集合运算
# 差集
print({1, 2, 5, 6} - {1, 9})
# 交集
print({1, 2, 5, 6} & {1, 9})
# 并集
print({1, 2, 5, 6} | {1, 9})

# 定义一个空集
kong = set()
print(kong)
print(len(kong))

# set构造函数
shop = set('shop')
print(shop)

# dist 字典
print(type({'name': 'a'}))
# dist的key不一定是字符串,可以是数字
print({'name': 'a', 1: 'first', '1': 'b'})
# 空的字典
print(type({}))
# 字典操作
dist = {'name': 'dist', 'age': '22'}
# 增改 字典不能用点语法增改value
dist['age'] = '23'
print('age', dist['age'])
# 查
print('age', dist['age'])
print('age', dist.get('age'))

# setdefault 传入一个key,如果有这个key,返回字典本身
# 如果没有这个key,新建这个key并且这个key的value是None,返回None
print(dist.setdefault('age'))
print(dist)
print(dist.setdefault('sex'))
print(dist)

# keys
a = dist.keys()
print(a)
print(type(a))

# str 字符串
print('str', type('ss'))
s = 'aaa'
c = 'aaa'
# 字符串是不可变的,意思是如果两个字符串的值相同,
# 那么它们的内存地址是一样的,这意味着换值等于换内存地址
print(s is c)

# 字符ascii编码,a-z的顺序,空格<大写<小写
print(min('dgPa'))
print(ord('A'))
print(ord('a'))

# number
# int,float也是不可变的,和字符串一样,值一样意味着内存地址一样
print('int', type(123))
print('float', type(123.45))
print('isinstance int',isinstance(123, int))
m = 123
n = 123
print(m is n)
print('m * 3=',m * 3)
print('2 ^ 3=',2 ** 3)

i = 1.12
j = 1.12
print(i is j)

d_ = 5







