class MyClass():
    def __init__(self, count = 100):
        self.name = 'a student'
        self.count = count

a = MyClass()
# <class '__main__.MyClass'> python中的面向对象编程其实就是面向类编程
print('type:', type(a))
print(a)
print('name:', a.name)