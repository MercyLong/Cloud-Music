<template>
  <div class="video-list-wrapper">
    <ul class="search-result-mv-list border-bt" v-if="mvList && mvList.length > 0">
      <li @click="gotoVideo(mv.id)" v-for="mv in mvList">
        <div class="mv-pic-url">
          <img :src="mv.cover">
        </div>
        <div class="album-content">
          <div class="album-name f-hide">
            <span v-if="hasType">MV：</span>{{mv.name}}</div>
          <div class="album-artist">{{mv.artistName}}</div>
        </div>
        <div v-if="hasArrow" class="right-arrow">
          <svg height="13" width="7" xmlns="http://www.w3.org/2000/svg" class="category_arrow" version="1.1">
            <path d="M0 0 L6 7 L0 13" stroke-width="1" stroke="#999" fill="none" />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  props: ['mvList', 'hasArrow', 'hasType'],
  methods: {
    gotoVideo(id) {
      this.$router.push({
        path: 'mv',
        query: {
          id: id
        }
      });
    }
  }
};

</script>
<style lang="less" scoped>
.video-list-wrapper {
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
}

</style>
