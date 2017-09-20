<template>
  <div class="pagination-load-wrapper">
    <div v-if="hasMore" class=""> {{loadText}}</div>
    <div v-else>没有更多了</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: ['loadText', 'hasMore']
};

</script>
<style lang="less" scoped>
.pagination-load-wrapper {
  padding: 20px;
  text-align: center;
  color: #888;
}

</style>
