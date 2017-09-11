<template>
  <section class="mv-recommend-wrapper">
    <div class="mv-recommend-title">相关推荐</div>
    <mv-lists :mv-list='mvRecommends'></mv-lists>
  </section>
</template>
<script type="text/javascript">
import mvLists from 'common/mvLists';
export default {
  props: ['mvRecommends'],
  components: {
    mvLists
  }
};

</script>
<style lang="less">
.search-result-mv-list {
  &.border-bt {
    &:after {
      border-bottom-width: 0;
    }
  }
}

.mv-recommend-wrapper {
  // 覆盖原有样式
  .mv-recommend-title {
    font-weight: 400;
    position: relative;
    padding-left: 9px;
    margin-top: 10px;
    margin-bottom: 4px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
}

</style>
