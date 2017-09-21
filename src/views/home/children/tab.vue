<template>
  <div class="home-ui-tab-wrapper">
    <nav class="home-ui-tab border-bt">
      <li @click="changeHomeTab(tab)" v-for="tab in tabList" class="tab-item">
        <div class="tab-text">
          <span>{{tab.text}}</span>
        </div>
      </li>
      <div :style="{width:elemWidth,transform:`translate3d(${elemMarginLeft},0,0) scaleY(.5)`,transition:isFirstLoad?'':'all .5s'}" class="slider-bar">
      </div>
    </nav>
  </div>
</template>
<script type="text/javascript">
import { mapMutations } from 'vuex';
export default {
  name: 'home-tab-selector',
  data() {
    return {
      tabList: [{
        id: 0,
        text: '推荐音乐',
        route: 'recommend'
      }, {
        id: 1,
        text: '歌单',
        route: 'playListTab'
      }, {
        id: 2,
        text: '排行榜',
        route: 'ranking'
      }, {
        id: 3,
        text: '搜索',
        route: 'search'
      }],
      isFirstLoad: true,
      elemWidth: null,
      elemMarginLeft: null,
      animation: {
        transition: `all .5s`
      }
    };
  },
  created() {
    let pathName = this.$route.name;
    this.findInitIndex(pathName);
  },
  mounted() {
    this.initSliderPosition();
  },
  methods: {
    ...mapMutations(['CHANGE_HOME_TAB']),
    changeHomeTab(tab) {
      // 初次加载的时候,重新计算位置
      this.CHANGE_HOME_TAB(tab.id);
      this.gotoTabContent(tab.route);
      this.isFirstLoad = false;
      this.initSliderPosition();
    },
    initSliderPosition() {
      let tabListElem = document.querySelectorAll('.tab-text')[this.homeTabCurrentIndex];
      let elemRect = tabListElem.getBoundingClientRect();
      this.elemWidth = `${elemRect.width}px`;
      this.elemMarginLeft = `${elemRect.left}px`;
    },
    findInitIndex(pathName) {
      this.tabList.forEach((item, index) => {
        if (item.route === pathName) {
          this.CHANGE_HOME_TAB(item.id);
        }
      });
    },
    gotoTabContent(route) {
      this.$router.push({
        path: route
      });
    }
  },
  computed: {
    homeTabCurrentIndex() {
      return this.$store.getters.getHomeIndex;
    }
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
  transform: translate3d(0, 0, 0);
  top: 64px;
  left: 0;
  z-index: 100;
  display: flex;
  .slider-bar {
    position: absolute;
    left: 0;
    bottom: -1px;
    z-index: 3;
    height: 4px;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background: #d33a31;
  }
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
