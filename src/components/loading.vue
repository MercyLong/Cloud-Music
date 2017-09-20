<template>
  <div class="loading-wrapper">
    <span>加载中</span>
    <div class="loading-container">
      <span class="first"></span>
      <span class="second"></span>
      <span class="thrid"></span>
      <span class="fourth"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {};

</script>
<style lang="less" scoped>
@keyframes loading {
  0%,
  100% {
    transform-origin: bottom;
    transform: scaleY(.3);
  }
  50% {
    transform-origin: bottom;
    transform: scaleY(1);
  }
}

.loading-wrapper {
  padding: 10px;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  .loading-container {
    margin-left: 10px;
    span {
      animation: loading .6s ease infinite;
      display: inline-block;
      width: 2px;
      background: #d33a31;
      &:nth-child(1) {
        -webkit-animation-delay: 0s;
      }
      &:nth-child(2) {
        -webkit-animation-delay: 0.1s;
      }
      &:nth-child(3) {
        -webkit-animation-delay: 0.4s;
      }
      &:nth-child(4) {
        -webkit-animation-delay: 0.3s;
      }
      &.first {
        height: 15px;
      }
      &.thrid {
        height: 17px;
      }
      &.second {
        height: 11px;
      }
      &.fourth {
        height: 14px;
      }
      &.fifth {
        height: 12px;
      }
    }
  }
}

</style>
