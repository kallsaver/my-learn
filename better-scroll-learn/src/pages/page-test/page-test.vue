<template>
  <div class="test">
    <div class="content">
      <div class="group">
        <!-- vue还可以通过v-model传值 -->
        <!-- 对应的key是value -->
        <switch-input
          v-model="scrollbarValue"
          data-key="scrollbarValue"
          @check="changeSwitchVal">
          <div class="label">scorllbar</div>
        </switch-input>
      </div>
      <div class="group sub1" v-if="scrollbarValue">
        <!-- vue还可以通过v-model传值 -->
        <!-- 对应的key是value -->
        <switch-input
          v-model="scrollbarFadeValue"
          data-key="scrollbarFadeValue"
          @check="changeSwitchVal">
          <div class="label">fade</div>
        </switch-input>
      </div>

      <div class="group sub1" v-if="scrollbarValue">
        <!-- vue还可以通过v-model传值 -->
        <!-- 对应的key是value -->
        <switch-input
          v-model="scrollbarInteractiveValue"
          data-key="scrollbarInteractiveValue"
          @check="changeSwitchVal">
          <div class="label">interactive</div>
        </switch-input>
      </div>

      <div class="group">
        <label-input
          data-key="probeTypeValue"
          v-model="probeTypeValue"
          @change="changeLabelVal">
          <div slot="label">probeType (1 ~ 3)</div>
        </label-input>
      </div>

      <div class="group">
        <switch-input
          v-model="bounceValue"
          data-key="bounceValue"
          @check="changeSwitchVal">
          <div class="label">bounce</div>
        </switch-input>
      </div>
      <div class="group sub1" v-if="bounceValue">
        <!-- vue还可以通过v-model传值 -->
        <!-- 对应的key是value -->
        <switch-input
          v-model="bounceLeftValue"
          data-key="bounceLeftValue"
          @check="changeSwitchVal">
          <div class="label">left</div>
        </switch-input>
      </div>
      <div class="group sub1" v-if="bounceValue">
        <!-- vue还可以通过v-model传值 -->
        <!-- 对应的key是value -->
        <switch-input
          v-model="bounceTopValue"
          data-key="bounceTopValue"
          @check="changeSwitchVal">
          <div class="label">top</div>
        </switch-input>
      </div>
    </div>
  </div>
</template>

<script>
import DevToolsOptions from '../../common/data/better-scroll-options.js';
import SwitchInput from '../../components/switch-input/switch-input.vue';
import LabelInput from '../../components/label-input/label-input.vue';
import { isEmpty } from '../../common/helpers/utils.js';
import { getData } from '../../common/helpers/dom.js';
import { getComments } from '../../common/api/api.js';

export default {
  name: 'page-test',
  data() {
    return {
      options: DevToolsOptions,
      scrollbarValue: false,
      scrollbarFadeValue: false,
      scrollbarInteractiveValue: false,
      probeTypeValue: 0,
      bounceValue: false,
      bounceLeftValue: false,
      bounceTopValue: false,
    };
  },
  created() {
    console.log('created');
    // this.transitionDemo = this.$createBodyTransitionDemo();

    // 不使用JSX的render函数写法,嵌套几层就很深了
    // this.dialogDemo = this.$createBodyDialogDemo({
    //   title: 'my-title'
    // }, (createElement) => {
    //   return [
    //     // template根元素上下的第一个div
    //     // 只在template根元素的子元素上写slot
    //     // 牛逼的是createElement的内容是属于当前vue文件的,class也是依赖当前vue文件
    //     // 扩展性非常强了,组件上的组件,js上写插槽
    //     // 用JSX更方便哦
    //     createElement(
    //       'div',
    //       {
    //         class: {
    //           title1: true
    //         },
    //         slot: 'title1'
    //       },
    //       '哈哈哈'),
    //     // template下的第二个div
    //     createElement(
    //       'div',
    //       {
    //         class: {
    //           title2: true
    //         },
    //         slot: 'title2',
    //       },
    //       [
    //         // div下的子元素
    //         createElement('p', {
    //           class: {
    //             p1: true
    //           },
    //         }, '我是p标签')
    //       ]
    //     )
    //   ];
    // });

    // JSX写法
    // this.dialogDemo = this.$createBodyDialogDemo({
    //   title: 'my-title'
    // }, (createElement) => {
    //   return (
    //     <div class="wrapper">
    //       {/* wrapper没有渲染出来,它只是JSX语法上必备的根元素
    //         只有有插槽的地方才会被使用 */}
    //       <div class="title1" slot="title1">哈哈哈</div>
    //       <div class="title2" slot="title2">
    //         <p class="p1">我是p标签</p>
    //       </div>
    //     </div>
    //   );
    // });
  },
  mounted() {
    console.log('scrollbarValue', this.scrollbarValue);
  },
  computed: {

  },
  watch: {
    scrollbarValue(newVal) {
      if (newVal) {
        this.options.scrollbar = {};
        this.scrollbarFadeValue = true;
        // this.dialogDemo.show();
      } else {
        this.options.scrollbar = false;
      }
    },
    scrollbarFadeValue(newVal) {
      this.options.scrollbar.fade = newVal;
      // getComments({
      //   id: 4193586758833502,
      //   page: 1
      // }).then((data) => {
      //   console.log('page-test.vue中的then');
      //   console.log(data);
      // });
    },
    scrollbarInteractiveValue(newVal) {
      this.options.scrollbar.interactive = newVal;
    },
    probeTypeValue(newVal) {
      this.options.probeType = newVal;
    },
    bounceValue(newVal) {
      if (newVal) {
        this.options.bounce = {};
        this.bounceLeftValue = true;
        this.bounceTopValue = true;
      }
    },
    bounceLeftValue(newVal) {
      this.options.bounce.left = newVal;
    },
    bounceTopValue(newVal) {
      this.options.bounce.top = newVal;
    }
  },
  methods: {
    changeSwitchVal(e, val) {
      let key = getData(e.target, 'key');
      this[key] = val;
    },
    changeLabelVal(e, val) {
      let key = getData(e.target, 'key');
      this[key] = val;
    }
  },
  components: {
    SwitchInput,
    LabelInput,
  },
};
</script>

<style lang="stylus" scope>
.test {
  .content {
    padding: 10px 00px 10px 20px;
    .group {
      padding: 10px 0px;
      border-bottom: 1px solid #ccc;
      &.sub1 {
        margin-left: 30px;
      }
      &.sub2 {
        margin-left: 60px;
      }
      .label {
        line-height: 34px;
        font-size: 18px;
        margin-left: 20px;
      }
    }
  }
}

.title1 {
  background: peru;
  color: #fff;
}
.title2 {
  p {
    background: orange;
    color: red;
  }
}
</style>

