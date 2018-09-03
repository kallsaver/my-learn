<!-- 使用这个组件需要用better-scroll包住外部的父代元素  -->
<template>
    <div class="cartcontrol">
        <!-- 动画效果:外层平移淡入,内层滚动 -->
        <div class="cart-decrease" 
            v-show="food.count>0" 
            @click.stop.prevent="decreaseCart"
            transition="move"
            >
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        food: {
            type: Object,
            default() {
                return {
                    count: 0
                }
            }
        }
    },
    created() {

    },
    methods: {
        addCart() {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count){
                // food传过来是并没有count这个属性,
                // 即使在props上申明了count属性也是不会绑定到视图,data才行
                Vue.set(this.food, 'count', 1);
            }else {
                this.food.count++;
            }
            // 派发父组件的事件
            this.$dispatch('cart.add', event.target);
        },
        decreaseCart() {
            if (!event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
}
</script>

<style lang="stylus">
    .cartcontrol{
        font-size: 0;
        .cart-decrease{
            display: inline-block;
            padding: 6px;
            transition: all 0.4s linear;
            // .inner{
            //     display: inline-block;
            //     line-height: 24px;
            //     font-size: 24px;
            //     color: rgb(0, 160, 220);
            //     transition: all 0.4s linear;
            //     transform: rotate(0);
            // }
            // 动画的最终状态
            &.move-transition{
                opacity: 1;
                transform: translate3d(0, 0, 0);
                .inner{
                    display: inline-block;
                    line-height: 24px;
                    font-size: 24px;
                    color: rgb(0, 160, 220);
                    transition: all 0.4s linear;
                    transform: rotate(0);
                }
            }
            // 动画初始状态
            &.move-enter, &.move-leave{
                opacity: 0;
                transform: translate3d(24px, 0, 0);
                .inner{
                    transform: rotate(180deg)
                }
            }
        }
        .cart-count{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-add{
            display: inline-block;
            padding: 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }
    }
</style>


