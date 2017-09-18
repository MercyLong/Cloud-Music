<template>
  <div class="home-wrapper">
    <download-header></download-header>
    <tab-selector></tab-selector>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script type="text/javascript">
import downloadHeader from 'common/downloadHeader';
import tabSelector from './children/tab';
export default {
  components: {
    downloadHeader,
    tabSelector
  }
};

</script>
<style lang="less" scoped>
.home-wrapper {
  min-height: 100%;
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
}

</style>
