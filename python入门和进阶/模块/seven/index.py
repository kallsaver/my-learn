# import会执行文件中的语句

# 导入一个模块(文件名),使用点语法获取这个模块的全局变量
import c1
# 使用别名替代模块名
import t.c1 as m
# import这个模块的全局变量,同时这个变量是导出文件的全局变量
from c2 import a
# 把模块的全局变量import进来并改名
from c3 import (a, b) 
# 不推荐使用*,会导致命名冲突覆盖,变量不明确
# 当使用from 具体的模块 import *时, _开头的全局变量(模块里的属性)是不会被导入的
#from c4 import *
#from c5 import *

# foo使用的是传参的方式,基本数据类型无法改变原引入文件的值
# from...import和es6 module的对基本数据类型的强绑定不一样
from imptee1 import foo, fooShow, fooArr

# import语法可以对基本数据类型强绑定,因为imptee2本身就是一个引用数据类型
import imptee2

print(c1.a)
print(m.a)
print(a)
foo = 'new foo'
fooArr[0] = 'new foo'
print('foo from index:', foo)
print('fooArr[0] from index:', fooArr[0])
fooShow()

imptee2.bar = 'new bar'
imptee2.barArr[0] = 'new bar'
print('bar from index:', imptee2.bar)
print('barArr[0] from index:', imptee2.barArr[0])
imptee2.barShow()


