<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0,'scale':scale}">
                        <i class="icon-shopping_cart"></i>
                        <div class="num">{{totalCount}}</div>
                    </div>
                </div>
                <div class="price" :class="{'highlight':totalCount>0}">¥{{totalPrice}}</div>
                <div class="desc">另需配送费¥{{deliveryPrice}}</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <div class="ball-container">
            <div class="ball" 
                transition="drop"
                v-for="ball in balls" 
                v-show="ball.show"
                >
                <div class="inner inner-hook"></div>
            </div>
        </div>
        <div class="showcart-list" v-show="listShow" transition="fold">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" v-el:list-content>
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="list-mark" 
      v-show="listShow" 
      transition="fade"
      @click="hideList"
    ></div>
</template>

<script>
// 参考: https://segmentfault.com/a/1190000009294321

import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";


export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true,
      a: 0,
      b: 100,
      c: 1000,
      scale: false,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      // fold为true表示折叠
      // 当外界改变this.fold或者this.totalCount的值,listShow就会触发
      // 菜单展示的逻辑是this.totalCount > 0 && this.fold == false
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.listContent, {
              click: true
            });
          } else {
            // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html#refresh
            // 当dom结构发生变化时重新计算
            this.scroll.refresh();
          }
        });
      }
      return show;
    },
  },
  created() {
    //console.log("minPrice", this.minPrice);
    //console.log("deliveryPrice", this.deliveryPrice);
  },
  methods: {
    drop(el) {
      //console.log(el);
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        // 随便找一个隐藏的小球
        if (!ball.show) {
          // 触发过渡动画
          ball.show = true;
          ball.el = el;
          // 把这个球放进已经用过的集合里,便于后面操作这个ball
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    hideList() {
      this.fold = true;
    },
    empty() {
      // 需要注意的是不能this.selectFoods = [];
      // 因为selectFoods是prods上的属性,应该操作selectFoods的属性
      // prods传过来的是指针
      // 并且在goods.vue的computed的selectFoods函数决定了两个组件的联动的关键是count
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert('支付');
    }
  },
  transitions: {
    // 这个动画是属于购物车组件的,需要外界传入开始位置
    drop: {
      // 动画0%
      beforeEnter(el) {
        console.log('beforeEnter');
        // 这个阶段el是不展示的,display:none的元素transition是不会生效的,立刻到位
        //console.log('before-enter-display',el.style.display);
        let count = this.balls.length;
        // 直到总数为零,即只要balls里面有球就可以
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // 获得元素相对屏幕的绝对定位
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            // 外层元素做y轴偏移,内层元素做x轴偏移
            // 相当于内层元素即做y轴偏移又做x轴偏移
            // 当它们的速度(transiton)符合抛物线公式时,就是抛物线的效果
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
        console.time('回流');
      },
      // 动画99%
      // 参数done是可选的,如果使用了done(),会立刻触发afterEnter,
      // 如果没使用done,vue会检查css的过渡时间,完成后触发afterEnter
      // 然而没使用done需要使用el.style.display = "none"更新样式
      // 使用css的transtion就不推荐使用done,纯js可以使用done
      enter(el) {
        // 这个阶段行内样式去掉了,display是走css或者默认的
        //console.log('enter-display',el.style.display);
        // 请求dom的布局api,浏览器会强制重排
        // https://www.cnblogs.com/dujingjie/p/5784890.html
        // 之所以要使用重排,是因为beforeEnter到enter是同步的,
        // 除了使用强制重排外,还可以使用setTimeout隔离重排,
        //和requestAnimationFrame主动寻找最佳时机重排
        let rf = el.offsetHeight;
        // 没有发生回流的时间是0.6ms,发生回流的时间是1.7ms
        // 推算出回流大概消耗1ms,1ms作为该页面是否会触发回流的重要依据
        console.timeEnd('回流');
        //console.trace(1);

        console.log('enter');
        this.a++;
        this.b++;
        console.time(this.a);
        console.time(this.c);
        //console.log('s',window.getComputedStyle(el).display)
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        console.timeEnd(this.c);
        this.scale = false;
        // el.addEventListener('transitionend', function(event){
        //     if (event.target === el){
        //         console.log('transitionend');
        //         done();
        //     }
        // });


        // var time = window.getComputedStyle(el).transitionDuration.replace(/s/,'') * 1000;
        // setTimeout(() => {
        //     console.log('done')
        //     done();
        // }, time);
       },
      // 动画100%
      afterEnter(el) {
        console.log('after');
        console.timeEnd(this.a);
        let ball = this.dropBalls.shift();
        if (ball) {
          //console.trace(2);
          // 不知道为啥ball.show在这种情况下无法关联视图,
          // setTimeout在transitionDuration秒后使用done可以
          ball.show = false;
          el.style.display = "none";
          this.scale = true;
          // keep-alive对组件缓存时,元素从无到有,会触发class上的animation
          setTimeout(() => {
            this.scale = false;
          },1000);
        }
      },
    }
  },
  components: {
    cartcontrol,
  },
};
</script>

<style lang="stylus">

@import "../../common/stylus/mixin.styl"

.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;

    .content {
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255, 255, 255, 0.4);

        .content-left {
            flex: 1;

            .logo-wrapper {
                display: inline-block;
                vertical-align: top;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background: #141d27;

                .logo {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    border-radius: 50%;
                    text-align: center;
                    background: #2b343c;

                    .icon-shopping_cart {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                    }

                    &.highlight {
                        background: rgb(0, 160, 220);

                        .icon-shopping_cart {
                            color: #fff;
                        }
                    }

                    .num {
                      position: absolute;
                      top: -6px;
                      right: -6px;
                      width: 24px;
                      height: 16px;
                      line-height: 16px;
                      text-align: center;
                      border-radius: 16px;
                      font-size: 9px;
                      font-weight: 700;
                      color: #fff;
                      background: rgb(240, 20, 20);
                      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                  }
                }
            }

            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;

                &.highlight {
                    color: #fff;
                }
            }

            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }

        .content-right {
            flex: 0 0 105px;
            width: 105px;

            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;

                &.not-enough {
                    background: #2b333b;
                }

                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }

    .ball-container {
        background:peru;
        // 落点的位置
        .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;

            // 调试用
            &.drop{
               transition: all 2s;

                .inner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: gold;
                    transition: all 2s;
                } 
            }

            // vue中使用过渡动画会要[name]-transition定位到这个样式
            // 简单的动画可以使用css,实际上也是vue封装的动画钩子来实现

            // 赛贝尔曲线描述的是路程y和时间x的关系,斜率就是速度
            // 元素运动的x轴方向就是x轴正方向,向下方向就是y轴正方向
            // 父元素控制y方向的运动,它的赛贝尔曲线应该是过原点有负方向最终正方向的抛物线
            // 子元素控制x方向的运动,它的赛贝尔曲线应该是过原点,正方向最后平行x轴的曲线
            // y: http://cubic-bezier.com/#.49, -0.29, 0.75, 0.41
            // x: http://cubic-bezier.com/#.04,.95,0,1
            // 但是由于x轴和y轴运动时间一样,平行x轴只是理想状态,
            // 所以x方向的赛贝尔曲线近似过原点的正斜率的直线
            // x: http://cubic-bezier.com/#.8,.89,.85,.87
            &.drop-transition {
                transition: all 0.4s cubic-bezier(.49, -0.29, 0.75, 0.41);

                .inner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgba(0, 160, 220, 1);
                    transition: all 0.4s cubic-bezier(.8,.89,.85,.87);
                }
            }
        }
    }

    .showcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width:100%;
      // .fold-enter => .fold-transition => .fold-leave
      // 动画最终状态
      &.fold-transition {
        transition: all 0.5s;
        transform translate3d(0, -100%, 0);
      }
      // 动画初始状态
      &.fold-enter,&.fold-leave {
        transform translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          border-bottom-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
}

.list-mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  //backdrop-filter: blur(10px);
  &.fade-transition {
    transition : opacity 0.5;
    opacity:1;
    background: rgba(7, 17, 27, 0.6);
  }
  &.fade-enter, &.fade-leave {
    opacity: 0;
    background: rgba(7, 17, 27, 0.6);
  }
}

.scale {
  animation:scale 0.2s;
}

@keyframes scale{
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

</style>


