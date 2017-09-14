<template>
  <section v-if="searchHistory && searchHistory.length > 0" class="search-history-wrapper">
    <div class="search-history-list">
      <transition-group name="slider-left">
        <div :key="item" v-for="item in searchHistory" class="search-history-item border-bt">
          <i class="iconfont clock">&#xe632;</i>
          <div class="search-history-content">
            <div @click="setSearchKeyword(item)">{{item}}</div>
            <i @click="remoteSearchHistory(item)" class="iconfont">&#xe633;</i>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>
<script type="text/javascript">
import { mapMutations } from 'vuex';
import { _setLocalSearchHistory, _removeLocalSearchHistory } from 'config/util';
export default {
  mounted() {
    this.initSearchHistory();
  },
  data() {
    return {
      searchHistory: []
    };
  },
  methods: {
    ...mapMutations(['SET_SEARCH_KEYWORD']),
    initSearchHistory() {
      let searchHistory = localStorage.getItem('searchHistory');
      if (searchHistory) {
        this.searchHistory = JSON.parse(searchHistory);
        // console.log(this.searchHistory);
      }
    },
    setSearchKeyword(keyword) {
      this.SET_SEARCH_KEYWORD(keyword);
      _setLocalSearchHistory('searchHistory', keyword);
    },
    remoteSearchHistory(keyword) {
      let searchHistory = _removeLocalSearchHistory('searchHistory', keyword);
      this.searchHistory = searchHistory;
    }
  }
};

</script>
<style lang="less" scoped>
.search-history-list {
  padding-left: 10px;
  font-size: 14px;
  color: #333;
  .slider-left-enter-active,
  .slider-left-leave-active {
    transition: all .4s;
  }

  .slider-left-enter,
  .slider-left-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}

.search-history-item {
  display: flex;
  height: 45px;
  align-items: center;
  transform: translate3d(0, 0, 0);
  .search-history-content {
    display: flex;
    flex: 1;
    align-items: center;
    div {
      flex: 1;
    }
    .iconfont {
      padding: 10px;
      margin-right: 10px;
    }
  }
  .iconfont {
    margin-right: 5px;
    color: #999;
    font-size: 12px;
    &.clock {
      font-size: 22px;
    }
  }
}

</style>
