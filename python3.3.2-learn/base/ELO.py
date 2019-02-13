# -*- coding:utf-8 -*-
import random
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
font = FontProperties(fname=r"C:/Windows/Fonts/方正颜宋简体.ttf", size=10)

user = {'孙悟': 114, '周兰': 116, '岑锐': 108, '尹兰': 100, '汪析': 132, '卫晰': 146, '伏义': 136, '伊哲': 126, '姚书': 110, '仰兰': 141, '郎正': 109, '柳婵': 123, '穆轩': 142, '梁贤': 109, '高颖': 103, '林威': 136, '尹倩': 144, '刁妯': 124, '邬哲': 144, '张英': 141}
user_name = ['孙悟', '周兰', '岑锐', '尹兰', '汪析', '卫晰', '伏义', '伊哲', '姚书', '仰兰', '郎正', '柳婵', '穆轩', '梁贤', '高颖', '林威', '尹倩', '刁妯', '邬哲', '张英']

def socre_change(a,b,sa):
    ra = user[a]
    rb = user[b]
    wr = round(((1 + 10 ** ((rb - ra) / 400)) ** (-1)), 4)
    score = round(ra + 16*(sa- wr), 1)
    if score < 0:
        score = 0
    return score

def game(x):
    #pylint: disable = W0612
    for i in range(0, x):
        game_user = user_name.copy()
        for i in range (0, int(len(game_user)/4)):
            a = random.choice(game_user)
            game_user.remove(a)
            b = random.choice(game_user)
            game_user.remove(b)
            state = random.choice([1, 0.5, 0])
            user[a] = socre_change(a, b, state)
            user[b] = socre_change(b, a, 1-state)
    print(user)

def darw():
    user_score=[]
    for i in user_name:
        user_score.append(int(user[i]))
    #plt.tick_params(labelsize=6)
    plt.subplots(1, 1, figsize=(10, 5))
    plt.bar(list(range(1,len(user_name)+1)),user_score,0.3)
    plt.xticks(list(range(1,len(user_name)+1)),user_name,fontproperties=font)
    plt.show()

while True:
    a = input('请输入比赛轮数，结束请输入end：')
    if a == 'end':
        darw()
        exit()
    else:
        game(int(a))
