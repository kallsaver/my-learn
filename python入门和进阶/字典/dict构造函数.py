# dict传入满足格式的参数会构造出一个新的字典

a = dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
print(a)

b = dict([['sape', 4139], ['guido', 4127], ['jack', 4098]])
print(b)

c = dict(sape = 4139, guido = 4127, jack = 4098)
print(c)