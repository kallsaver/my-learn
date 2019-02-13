
# 集合有两种,一种是可变集合set,另一种是不可变集合frozenset,对应两个构造函数
# 可变集合可以添加和修改元素,不可变集合不可以添加和修改元素
# 可变集合是不可哈希的,而不可变集合是可以哈希的
# 可变集合和不可变集合可以比较里面元素是否完全相同
c1 = set('cheeseshop')
print(c1)

c2 = frozenset('cheeseshop')

print(c1 == c2)

t = frozenset('bookshop')
print(t)

# 集合的元素只能是数字和字符串
o = set({1, '1', 'dffd', 'r'})
print(o)
