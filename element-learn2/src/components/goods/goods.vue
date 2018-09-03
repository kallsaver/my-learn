<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-ul">
        <li class="menu-item" :key="index"
          v-for="(item, index) in goods"
          @click="selectMenu(index, $event)"
          :class="{'current':currentIndex===index}">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li :key="item.name"
          v-for="item in goods"
          class="food-list"
          ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li :key="food.name"
              @click="selectFood(food, $event)"
              v-for="food in item.foods"
              class="food-item">
              <div class="icon">
                <img v-lazy="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- html中的key使用'-'连接两个单词,js中使用驼峰命名 -->
    <shopcart ref="shopcart"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods">
    </shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Shopcart from '../shopcart/shopcart';
import Cartcontrol from '../cartcontrol/cartcontrol';
import Food from '../food/food';
import Vue from 'vue';

console.log('goods.vue');

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    },
    obj: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      classMap: [],
      listHeight: [],
      scrollY: 0,
      // 组件都没用使用懒加载,所以初始化的时候所有的组件的逻辑都跑了一遍
      // 使用懒加载可以减少编译
      selectedFood: {
        ratings: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('good beforeRouteEnter');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('good beforeRouteLeave');
    next();
  },
  activated() {
    console.log('good activated');
  },
  deactivated() {
    console.log('good deactivated');
  },
  // 被keep-alive的组件,created都不会执行,而会activated
  // 如果这个组件刚好是路由组件,会有beforeRouteEnter,
  // 初始化的生命周期是beforeRouteEnter => created => mounted => activated => deactivated
  created() {
    console.log('goods created');
    this.obj.name = 'new obj';
    this.classMap = [
      'decrease',
      'discount',
      'special',
      'invoice',
      'guarantee'
    ];
    this.$http.get('/api/goods').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log('food',this.goods[0].foods[0])
        // setTimeout(() => {
        //     console.log('timeout',this.goods[0].foods[0])
        // },3000)
        this.$nextTick(() => {
          this.initScroll();
          this.calculateHeight();
        });
      }
    });
  },
  mounted() {
    console.log('goods mounted');
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      console.log('computed selectFoods');
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          // 当this.goods[i].foods[j].count变化时,这个函数会触发
          // 而this.goods[i].foods[j]被传入cartcontrol组件
          // 这个函数的返回结果传入shopcart组件
          // 所以cartcontrol和shopcart组件通过这里的count联动起来了
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  watch: {
    selectFoods() {
      console.log('watch selectedFoods in goods.vue');
    }
  },
  methods: {
    selectMenu(index, event) {
      // BScroll封装的点击事件有event._constructed=true
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      console.log(food);
      this.selectedFood = food;
      this.$refs.food.show();
    },
    initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        // 在移动端加上click参数被BScroll实例化的DOM点击事件才有效
        // 在pc端会监听到原生的和BScroll封装的,也就是触发两次
        // BScroll的event有_constructed属性为true
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        // 能够在BScroll的实例滚动时获得滚动的位置
        probeType: 3
      });

      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    addFood(target) {
      console.log('addFood');
      this.drop(target);
    },
    drop(target) {
      // 体验优化,等待food.count的数据更新到DOM再做动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    }
  },
  components: {
    Shopcart,
    Cartcontrol,
    Food
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  overflow: hidden;
  width: 100%;

  .menu-wrapper {
    // 扩展,收缩,固定
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        background: peru;
        font-weight: 700;

        .text {
          bottom-none();
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-bottom-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;

        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;

          &.decrease {
            bg-image('decrease_3');
          }

          &.discount {
            bg-image('discount_3');
          }

          &.guarantee {
            bg-image('guarantee_3');
          }

          &.invoice {
            bg-image('invoice_3');
          }

          &.special {
            bg-image('special_3');
          }
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-bottom-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
