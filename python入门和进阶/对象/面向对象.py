# 类 == 面向对象

# 类的构造函数
class Student():
    print('Stundent')
    # 类变量 用于共享数据
    # 不能作为外围变量传递给实例的函数
    sum = 0
    name = 'qq'
    
    # 在构造函数体语句执行完毕之后执行
    # 构造函数内部的实例函数的作用域是独立的
    # 实例的初始化函数用于设置实例的属性的初始值
    # 只能return None
    def __init__(self, name, age):
        print('__init__')
        # 通过self.__class__语法准确访问类变量
        print('sum', self.__class__.sum)
        # 实例变量
        self.name = name
        self.age = age
        # 有歧义,实例的属性=>类变量属性=>父类的属性查找,不能准确访问类变量
        print('self.name', self.name)
    
    print('----------------------')

    # python中,只能从对象内部访问的'私有'变量(函数)是不存在的
    # 但是可以以下划线开头命名,表明会被处理API的不需要公开的部分
    # 仅仅视为实现细节.例如名字重整可以保留子类继承时同名函数被覆盖的情况
    # 实例函数,挂载在实例上的
    # 构造函数也能访问到,只不过要加上实例参数
    def printFile(self):
        self.__class__.sum += 1
        print('self.__class__.sum', self.__class__.sum)


a = Student('Mike', 24)
# 实例上的属性都是暴露在外的,没有'私有的'变量
# a.__init__('UU', 20)
print(a.name)
print(Student.name)
# 对象的属性
print(a.__dict__)

# python先查找顺序:实例的属性=>类变量属性=>父类的属性
print(a.sum)
a.printFile()
# 实例变量通过构造汗外部也可以访问,通过构造函数带上实例的参数
Student.printFile(a)