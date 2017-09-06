<template>
  <div class="home-ui-tab-wrapper">
    <nav class="home-ui-tab border-bt">
      <li @click="changeHomeTab(tab.id)" v-for="tab in tabList" class="tab-item">
        <div :class="tab.id==homeTabCurrentIndex?'active':''" class="tab-text">
          <span>{{tab.text}}</span>
        </div>
      </li>
    </nav>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'home-tab-selector',
  data() {
    return {
      currentIndex: 0,
      tabList: [{
        id: 0,
        text: '推荐音乐'
      }, {
        id: 1,
        text: '排行榜'
      }, {
        id: 2,
        text: '搜索'
      }]
    };
  },
  methods: {
    ...mapMutations(['CHANGE_HOME_TAB']),
    changeHomeTab(id) {
      this.CHANGE_HOME_TAB(id);
    }
  },
  computed: {
    ...mapState(['homeTabCurrentIndex'])
  }
};

</script>
<style lang="less" scoped>
.home-ui-tab-wrapper {
  padding-top: 40px;
}

.home-ui-tab {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #fff;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 100;
  display: flex;
  .tab-item {
    flex: 1;
    font-size: 15px;
    color: #333;
    height: 100%;
    text-align: center;
    cursor: pointer;
    .tab-text {
      position: relative;
      display: inline-block;
      height: 100%;
      padding: 0 5px;
      box-sizing: border-box;
      color: #333;
      font-size: 15px;
      line-height: 40px;
      height: 100%;
      line-height: 40px;
      &.active {
        color: #d33a31;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          z-index: 3;
          width: 100%;
          height: 4px;
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
          background: #d33a31;
        }
      }
    }
  }
}

</style>
