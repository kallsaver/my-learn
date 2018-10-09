<template>
  <page :title="$t('examples.indexList')">
    <div>
      <!--split是占位作用-->
      <div class="split"></div>
      <div class="view-wrapper">
        <div class="index-list-wrapper">
            <index-list :options="options" :data="data" :title="title" @select="selectItem"></index-list>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '../../components/page/page.vue';
import IndexList from '../../components/index-list/index-list.vue';
import cityData from '../../data/index-list.json';
import DevToolsOptions from '../../common/data/better-scroll-options.js';
const INTEST = false;

export default {
  name: 'page-index-list',
  data() {
    return {
      title: this.$i18n.t('indexListPage.title'),
      cityData: [],
      // 传递options给index-list.vue再传给scroll.vue
      options: DevToolsOptions
    };
  },
  // mounted也可以
  created() {
    console.log('page-index-list.vue created');
    // 异步获取城市数据
    setTimeout(() => {
      const data = {
        name: 'Y',
        cities: [
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
          {name: '测试', value: 100},
        ]
      };
      this.cityData = [].concat(cityData);
      if (INTEST) {
        this.cityData.push(data);
      }
    }, 1000);
  },
  computed: {
    data() {
      let ret = [];
      this.cityData.forEach((cityGroup) => {
        let group = {};
        group.name = cityGroup.name;
        group.items = [];
        cityGroup.cities.forEach((city) => {
          let item = {};
          item.name = city.name;
          item.value = city.cityid;
          group.items.push(item);
        });
        ret.push(group);
      });
      return ret;
    }
  },
  methods: {
    selectItem(item) {
      // this.$router.back();
      console.log(item);
    }
  },
  components: {
    Page,
    IndexList
  },
  destroyed() {
    console.log('page-index-list.vue destroyed');
  },
};
</script>

<style lang="stylus">
.split {
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 10px;
  margin-top: -10px;
  //background: #efeff4;
  background: red;
}

.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  .index-list-wrapper {
    height: 100%;
    width: 95%;
    margin: 0 auto;
  }
}

</style>
