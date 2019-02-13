c = set('cheeseshop1')
# 添加一个元素
c.add(1)
print(c)
# 更新一个集合
c.update('abcd')
print(c)
c.update({'v', 'uu'})
print(c)

# 删除一个元素
c.remove('a')
print(c)

copy = c.copy()
print(copy)
print(copy is c)
print(copy == c)
