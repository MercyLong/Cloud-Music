<template>
  <div class="artists-tab-wrapper">
    <ul class="artists-tab-list border-bt">
      <li @click="changeArtistTabIndex($index,item)" class="artists-tab-item" v-for="(item,$index) in tabList">
        <div :class="$index == artistTabCurrentIndex?'active':''" class="tab-content">
          {{item.text}}
          <span :class="$index == 0?'hot':''" class="tab-size">{{item.size}}</span>
        </div>
      </li>
      <div :style="{width:elemWidth,transform:`translate3d(${elemMarginLeft},0,0) scaleY(.5)`,transition:isFirstLoad?'':'all .5s'}" class="slider-bar">
      </div>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isFirstLoad: true,
      elemWidth: null,
      elemMarginLeft: null
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (!this.id) {
      this.$router.push({
        path: '/'
      });
    };
    this.findIndex(this.tabList);
  },
  props: ['hotLen', 'albumLen', 'mvLen'],
  computed: {
    ...mapGetters(['artistTabCurrentIndex']),
    tabList() {
      return [{
        text: '热门',
        size: this.hotLen,
        route: 'ArtistsHot',
        idx: 0
      }, {
        text: '专辑',
        size: this.albumLen,
        route: 'ArtistsAlbum',
        idx: 1
      }, {
        text: 'MV',
        size: this.mvLen,
        route: 'ArtistsMv',
        idx: 2
      }, {
        text: '歌手信息',
        idx: 3,
        route: 'ArtistsDesc'
      }];
    }
  },
  methods: {
    ...mapMutations(['CHANGE_ARTIST_TAB']),
    initSliderPosition() {
      let tabListElem = document.querySelectorAll('.tab-content')[this.artistTabCurrentIndex];
      let elemRect = tabListElem.getBoundingClientRect();
      this.elemWidth = `${elemRect.width}px`;
      this.elemMarginLeft = `${elemRect.left}px`;
    },
    changeArtistTabIndex(idx, item) {
      this.CHANGE_ARTIST_TAB(idx);
      this.isFirstLoad = false;
      this.initSliderPosition();
      this.$router.replace({
        name: item.route,
        query: {
          id: this.id
        }
      });
    },
    findIndex(tabList) {
      let pathName = this.$route.name;
      tabList.forEach((item, index) => {
        if (item.route === pathName) {
          this.CHANGE_ARTIST_TAB(item.idx);
        };
      });
    }
  },
  mounted() {
    this.initSliderPosition();
  }
};

</script>
<style lang='less' scoped>
.artists-tab-wrapper {
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
  .artists-tab-list {
    color: #333;
    height: 44px;
    align-items: center;
    display: flex;
    font-size: 16px;
    .artists-tab-item {
      text-align: center;
      flex: 1;
      font-size: 14px;
      .tab-content {
        position: relative;
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        height: 100%;
        line-height: 44px;
        .tab-size {
          font-size: 12px;
          color: #999;
        }
        &.active {
          color: #d33a31;
          .tab-size {
            color: #d33a31;
          }
        }
      }
    }
  }
}

</style>
