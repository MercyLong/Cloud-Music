<template>
  <div class="home-wrapper">
    <download-header></download-header>
    <tab-selector></tab-selector>
    <transition>
      <main-content></main-content>
    </transition>
  </div>
</template>
<script type="text/javascript">
import downloadHeader from 'common/downloadHeader';
import mainContent from './children/content';
import tabSelector from './children/tab';
export default {
  components: {
    downloadHeader,
    mainContent,
    tabSelector
  }
};

</script>
<style lang="less" scoped>
.home-wrapper {}

</style>
