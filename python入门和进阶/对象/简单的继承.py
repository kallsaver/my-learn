
# 基于object的类,可以不写object,默认都是object
class Father(object):
    # __init__初始化函数总是在构造函数体(无论多少父类子类)里面的语句执行完毕后再执行
    # __init__函数同样会被继承和覆盖
    def __init__(self, name, age):
        print('created a Father instance')
        self.name = name
        self.age = age

        # __class__是实例的最上一层的类
        #self.run = self.__class__._run

        # 尽管run已经被子类覆盖,但是__init__执行在后,被重新改写回父类的函数
        self.run = self._run

    def run(self):
        print('run from Father')
    
    # 被覆盖
    def walk(self):
        print('walk from Father')
    
    _run = run

# Son类会获取Father类上的所有属性,相同名字的属性都会覆盖,例如__init__
class Son(Father):
    
    # 可以让父类的__init__和子类的__init__合并
    # 其他实例函数也一样
    #def __init__(self, name, age):
        #print('created a Son instance')
        #Father.__init__(self, name, age)
        #super(Son, self).__init__(name, age)


    def walk(self):
        print('walk from Son')
    
    def run(self):
        print('run from Son')

    print('-----------------')

# f = Father()
# print(f.__class__.__name__)
s = Son('mike', 20)
s.run()
s.walk()
print(s.name)

# __bases__只能是构造函数去使用,类似于js的prototytpe
print(Father.__bases__)

print(Son.__bases__)