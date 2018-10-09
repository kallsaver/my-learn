<template>
  <div class="feature">
    <ul class="feature-list">
      <li class="feature-item">
        <div class="title">{{ $t('features.userExperience.title') }}</div>
        <p :class="lang">{{ $t('features.userExperience.desc') }}</p>
      </li>
      <li class="feature-item">
        <div class="title">{{ $t('features.application.title') }}</div>
        <p :class="lang">{{ $t('features.application.desc') }}</p>
      </li>
      <li class="feature-item">
        <div class="title">{{ $t('features.dependence.title') }}</div>
        <p :class="lang">{{ $t('features.dependence.desc') }}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  }
};
</script>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    computed: {
      lang() {
        return this.$i18n.locale
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"

.feature {
  padding: 10px;
  .feature-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .feature-item {
      text-align: left;
      padding: 6px;
      margin-bottom: 16px;
    }
    .title {
      margin-bottom: 15px;
      color: #333;
      font-size: $fontsize-large-xxx;
      line-height: 28px;
      font-weight: normal;
      p {
        line-height: 180%;
        &.zh {
          text-align: justify;
        }
      }
    }
  }
}

</style>
