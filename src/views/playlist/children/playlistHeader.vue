<template>
  <div class="playlist-header-wrapper">
    <div :style="{backgroundImage:`url(${currentPlayListDetail.coverImgUrl})`}" class="bg-wrapper absolute-full">
    </div>
    <div class="playlist-header">
      <div class="img-wrapper">
        <img :src="currentPlayListDetail.coverImgUrl">
        <span v-if="currentPlayListDetail.playCount" class="play-number">
        <i class="iconfont">&#xe600;</i>
        {{currentPlayListDetail.playCount| addMeasurement(4,'万')}}
        </span>
      </div>
      <div class="conent-wrapper">
        <div class="content-name">{{currentPlayListDetail.name}}
        </div>
        <div class="content-artist">
          <span class="artist-url">
          	<img :src="currentPlayListDetail.creator&&currentPlayListDetail.creator.avatarUrl">
          </span>
          <span class="artist-name">{{currentPlayListDetail.creator && currentPlayListDetail.creator.nickname}}</span>
          <i class="iconfont">&#xe604;</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['currentPlayListDetail'])
  }
};

</script>
<style lang="less" scoped>
.playlist-header-wrapper {
  position: relative;
  padding: 30px 15px;
  color: #fff;
  overflow: hidden;
  .bg-wrapper {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    z-index: 1;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: " ";
      z-index: 2;
      background-color: rgba(0, 0, 0, .25);
    }
  }
  .playlist-header {
    margin-top: 40px;
    position: relative;
    z-index: 2;
    display: flex;
    .conent-wrapper {
      margin-left: 15px;
      .content-name {
        margin-top: 15px;
        font-size: 17px;
        color: #fefefe;
      }
      .content-artist {
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 15px;
        color: hsla(0, 0%, 100%, .5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        .iconfont {
          font-size: 24px;
        }
        .artist-url {
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
          img {
            border-radius: 50%;
          }
        }
        .artist-name {
          font-size: 14px;
        }
      }
    }
  }
  .img-wrapper {
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      height: 23px;
      width: 100%;
      z-index: 2;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, .5), transparent);
    }
    .play-number {
      padding-right: 5px;
      right: 0;
      top: 0;
      left: 0;
      text-align: right;
      position: absolute;
      z-index: 3;
      font-size: 14px;
    }
    img {
      width: 126px;
      height: 126px;
    }
  }
}

</style>
