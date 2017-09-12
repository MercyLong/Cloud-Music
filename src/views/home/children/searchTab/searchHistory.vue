<template>
  <section v-if="searchHistory && searchHistory.length > 0" class="search-history-wrapper">
    <div class="search-history-list">
      <div v-for="item in searchHistory" class="search-history-item border-bt">
        <i class="iconfont clock">&#xe632;</i>
        <div class="search-history-content">
          <div @click="setSearchKeyword(item)">{{item}}</div>
          <i class="iconfont">&#xe633;</i>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">
import { mapMutations } from 'vuex';
import { _setLocalSearchHistory } from 'config/util';
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
    }
  }
};

</script>
<style lang="less" scoped>
.search-history-list {
  padding-left: 10px;
  font-size: 14px;
  color: #333;
}

.search-history-item {
  display: flex;
  height: 45px;
  align-items: center;
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
