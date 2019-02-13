# 参考文献:https://www.jb51.net/article/117554.htm

x = [1, 2, 3]

iter = x.__iter__()

print(iter.__next__())
print(iter.__next__())
print(iter.__next__())

for item in x:
    print(item)

# 实现一个新的类,支持for迭代
class MyRange:
    def __init__(self, num):
        self.i = 0
        self.num = num

    def __iter__(self):
        return self
    
    def __next__(self):
        if self.i < self.num:
            i = self.i
            self.i += 1
            return i
        else: 
            raise StopIteration()

for i in MyRange(3):
    print('自定义迭代i', i)

print([i for i in MyRange(3)])


