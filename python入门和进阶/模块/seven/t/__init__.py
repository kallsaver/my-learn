# 决定哪个模块可以导出
# 当使用from t import *就可以验证

# 引入一些第三方包,这样别的包引入t包就不用再引入第三方包
# 例如import t.c1;print(t.sys.path)

import sys 
import datetime
import io

__all__ = ['c1']

print('this is t')