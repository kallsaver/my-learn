# global使用全局变量
# nonlocal使用外层变量(这个变量不能是全局变量)

count = 0;
sum = 0;


def father():
    count = 0
    def son():
        global sum
        nonlocal count
        count += 1
        sum += 100
        print('sum', sum)
        return count
    return son

son = father()
print('count', son())
print('count', son())
print('count', son())