arr1 = [1, 2, 3]
# append,在列表的末尾插入一个元素,没有返回值
arr1.append(4)
print(arr1)
arr2 = [5]
# extend 合并两个列表,没有返回值
arr2.extend(arr1)
print('arr2', arr2)
# insert插入一个元素,没有返回值
arr1.insert(1, 100)
print(arr1)