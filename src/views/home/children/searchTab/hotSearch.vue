<template>
  <div class="search-container-wrapper">
    <div v-if="!searchKeywords" class="search-hot-wrapper">
      <div class="hot-list-wrapper">
        <div class="search-hot-title">热门搜索</div>
        <ul class="hot-list">
          <li @click="setSearchKeywords(hot.first)" v-for="hot in hotsLists" class="hot-item border-1px">{{hot.first}}</li>
        </ul>
      </div>
      <search-history></search-history>
    </div>
    <div v-if="searchKeywords" class="search-result-wrapper">
      <!-- 搜索专辑列表 -->
      <section class="search-album-wrapper">
        <h3 class="search-result-title">最佳匹配</h3>
        <ul v-if="searchAlbum && searchAlbum.length > 0" class="search-result-album-list border-bt">
          <li v-for="album in searchAlbum">
            <div class="pic-url cover-url">
              <img :src="getImageUrl(album.picUrl,100)">
            </div>
            <div class="album-content">
              <div class="album-name f-hide">专辑：{{album.name}}</div>
              <div class="album-artist">{{album.artist.name}}</div>
            </div>
            <div class="right-arrow">
              <svg height="13" width="7" xmlns="http://www.w3.org/2000/svg" class="category_arrow" version="1.1">
                <path d="M0 0 L6 7 L0 13" stroke-width="1" stroke="#999" fill="none" />
              </svg>
            </div>
          </li>
        </ul>
        <ul v-if="searchArtist && searchArtist.length > 0" class="search-result-artist-list border-bt">
          <li v-for="artist in searchArtist">
            <div class="pic-url">
              <img :src="getImageUrl(artist.img1v1Url)">
            </div>
            <div class="album-content">
              <div class="album-name f-hide">歌手：{{artist.name}}</div>
            </div>
            <div class="right-arrow">
              <svg height="13" width="7" xmlns="http://www.w3.org/2000/svg" class="category_arrow" version="1.1">
                <path d="M0 0 L6 7 L0 13" stroke-width="1" stroke="#999" fill="none" />
              </svg>
            </div>
          </li>
        </ul>
        <mv-lists :has-type="true" :has-arrow="true" :mv-list="searchMv"></mv-lists>
        <song-lists :song-lists="songSearchResults"></song-lists>
      </section>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchHotSearch, fetchMultiSearchResults, fetchSongSearchResults } from 'service';
import { mapGetters, mapMutations } from 'vuex';
import songLists from 'common/songLists';
import searchHistory from './searchHistory';
import { getImageUrl } from 'config/mixin';
import mvLists from 'common/mvLists';
import { _setLocalSearchHistory } from 'config/util';
export default {
  methods: {
    ...mapMutations(['SET_SEARCH_KEYWORD']),
    // 初始化热门标签
    async initHotSearch() {
      var res = await fetchHotSearch();
      if (res.code === 200) {
        this.hotsLists = res.result && res.result.hots;
      }
    },
    setSearchKeywords(keyword) {
      this.SET_SEARCH_KEYWORD(keyword);
      // 设置本地存储
      _setLocalSearchHistory('searchHistory', keyword);
      this.getResultsByKeyword(keyword);
    },
    setLocalHistory(keyword) {
      localStorage.searchHistory.push(keyword);
    },
    async getResultsByKeyword(keyword) {
      var res = await fetchMultiSearchResults(keyword);
      if (res.code === 200) {
        this.searchAlbum = res.result.album;
        this.searchArtist = res.result.artist;
        this.searchMv = res.result.mv;
      };
      var resSong = await fetchSongSearchResults(keyword);
      if (resSong.code === 200) {
        // 处理数据结构，外面包一层，以便复用组件
        this.songSearchResults = this.dataProcess(resSong.result.songs);
      };
    },
    dataProcess(songList) {
      return songList.map((item, idx) => {
        return {
          song: item
        };
      });
    },
    initLocalStorageHistory() {
      if (!localStorage.searchHistory) {
        localStorage.setItem('searchHistory', []);
      };
    }
  },
  watch: {
    searchKeywords(newVal, oldVal) {
      this.getResultsByKeyword(newVal);
    }
  },
  mixins: [getImageUrl],
  computed: {
    ...mapGetters(['searchKeywords'])
  },
  components: {
    songLists,
    mvLists,
    searchHistory
  },
  data() {
    return {
      hotsLists: [],
      searchAlbum: [],
      searchArtist: [],
      songSearchResults: [],
      searchMv: []
    };
  },
  mounted() {
    if (this.searchKeywords) {
      this.getResultsByKeyword(this.searchKeywords);
    };
    this.initHotSearch();
  }
};

</script>
<style lang="less" scoped>
.search-container-wrapper {
  .search-album-wrapper {
    padding: 8px 0 4px;
  }
  .search-result-album-list,
  .search-result-artist-list,
  .search-result-mv-list {
    margin-left: 10px;
    .mv-pic-url {
      width: 89px;
      height: 50px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right-arrow {
      padding-top: 1px;
      margin: 0 9px;
    }
    .album-content {
      width: 0px;
      flex: 1;
      margin-left: 15px;
      height: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .album-name {
        font-size: 17px;
        color: #333;
      }
      .album-artist {
        margin-top: 8px;
        font-size: 12px;
        line-height: 15px;
        color: #999;
      }
    }
    li {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 66px;
      padding: 8px 10px 8px 0;
      box-sizing: border-box;
      .pic-url {
        position: relative;
        width: 50px;
        height: 50px;
        &.cover-url {
          img {
            height: 100%;
          }
          &:after {
            content: "";
            position: absolute;
            top: 2px;
            right: -10px;
            width: 10px;
            height: 46px;
            background-repeat: no-repeat;
            background-size: 166px 97px;
            background-image: url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28…);
            background-position: 0 -30px;
          }
        }
      }
    }
  }
  .search-result-title {
    margin-left: 10px;
    font-size: 12px;
    line-height: 16px;
    color: #666;
  }
}

.search-hot-wrapper {
  .search-hot-title {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    margin-bottom: 15px;
  }

  .hot-list-wrapper {
    padding: 15px 10px 0;
    .hot-list {
      overflow: hidden;
    }
    .hot-item {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      &:after {
        border-color: #d3d4da;
        border-radius: 96px
      }
    }
  }
}

</style>
