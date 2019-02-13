arr1 = [1, 2, 3]
print(arr1 is arr1[:])
a = arr1[:]
b = arr1[:]
# arr[:]不是一个单例模式
print('a is b:', a is b)
# 注意del arr1[:]的意思是把arr1中的所有元素清空,相当于arr1.clean()
# 和a = arr1[:];del a是不一样的
# del arr[:]操作的是arr不是arr[:]的结果
del arr1[:]
print(arr1)
print(a)