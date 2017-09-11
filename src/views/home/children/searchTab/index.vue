<template>
  <div class="search-tab-wrapper">
    <search></search>
  </div>
</template>
<script type="text/javascript">
import search from './search';
export default {
  components: {
    search
  }
};

</script>
<style lang="less" scoped>
.search-tab-wrapper {
  transform: translate3d(0, 0, 0);
}

</style>
