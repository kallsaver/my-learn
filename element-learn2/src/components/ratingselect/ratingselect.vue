<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <div class="block positive" :class="{'active':selectType.value===2}" @click="select(2, $event)">
        <span class="text">{{desc.all}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="block positive" :class="{'active':selectType.value===0}" @click="select(0, $event)">
        <span class="text">{{desc.positive}}</span>
        <span class="count">{{positives.length}}</span>
      </div>
      <div class="block negative" :class="{'active':selectType.value===1}" @click="select(1, $event)">
        <span class="text">{{desc.negative}}</span>
        <span class="count">{{negatives.length}}</span>
      </div>
    </div>
    <div class="switch" :class="{'on':onlyContent.value}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    // 评价列表,用于计算好评差评的数量
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Object,
      default() {
        return {
          value: ALL
        };
      }
    },
    onlyContent: {
      type: Object,
      default() {
        return {
          value: false
        };
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    // 改变this.selectType.value,触发父组件和this.selectType.value相关的计算
    // this.selectType.value会导致列表展示的数量,父组件的BetterScroll要refresh
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType.value = type;
      this.$emit('betterScrollRefresh');
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent.value = !this.onlyContent.value;
      this.$emit('betterScrollRefresh');
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;

    .block {
      display: inline-block;
      padding: 0px 12px;
      margin-right: 8px;
      border-radius: 1px;
      color: rgb(77, 85, 93);
      font-size: 0;
      height: 32px;

      &.active {
        color: #fff;
      }

      .text {
        // 最保险的垂直居中
        vertical-align: text-top;
        line-height: 32px;
        height: 32px;
        font-size: 12px;
        display: inline-block;
      }

      .count {
        vertical-align: text-top;
        line-height: 32px;
        height: 32px;
        display: inline-block;
        margin-left: 2px;
        font-size: 8px;
      }

      &.positive {
        background: rgba(0, 160, 220, 0.2);

        &.active {
          background: rgb(0, 160, 220);
        }
      }

      &.negative {
        background: rgba(77, 85, 93, 0.2);

        &.active {
          background: rgb(77, 85, 93);
        }
      }
    }
  }

  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;

    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }

    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }

    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>
