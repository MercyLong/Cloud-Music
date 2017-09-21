<template>
  <div class="high-quality-wrapper">
    <div :style="{backgroundImage:!coverInfo.coverImgUrl?'':`url(${getImageUrl(coverInfo.coverImgUrl,200,'webp')})`}" class="high-quality">
    </div>
    <div class="hight-quality-detail-wrapper">
      <div class="img-wrapper">
        <img :src="getImageUrl(coverInfo.coverImgUrl,200,'webp')">
        <div class="content-wrapper"></div>
      </div>
      <div class="high-quality-content-wrapper">
        <div class="high-quality-title">
          <i class="iconfont high-quality-icon">&#xe6ce;</i>
          <div>精品歌单</div>
          <i class="iconfont">&#xe604;</i>
        </div>
        <div class="high-quality-name">{{coverInfo.name}}</div>
        <div class="high-quality-tips">{{coverInfo.copywriter}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchHighQualityPlayList } from 'service';
import { getImageUrl } from 'config/mixin';
export default {
  data() {
    return {
      offset: 0,
      limit: 1,
      coverInfo: {}
    };
  },
  mixins: [getImageUrl],
  methods: {
    async initQualityPlayList() {
      let res = await fetchHighQualityPlayList({
        offset: this.offset,
        limit: this.limit
      });
      if (res.playlists && res.playlists.length) {
        this.coverInfo = res.playlists[0];
      }
    }
  },
  mounted() {
    this.initQualityPlayList();
  }
};

</script>
<style lang="less" scoped>
.bounce-slid-enter-active,
.bounce-slid-leave-active {
  transition: all .2s;
}

.bounce-slid-enter,
.bounce-slid-leave-active {
  transform: translate3d(0, 100%, 0);
}

.high-quality-wrapper {
  padding-bottom: 39%;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  .hight-quality-detail-wrapper {
    margin-top: 10px;
    margin-left: 10px;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
  }
  .img-wrapper {
    z-index: 5;
    width: 25%;
  }
  .high-quality-content-wrapper {
    flex: 1;
    color: #fff;
    margin-left: 15px;
    margin-bottom: 20px;
    .high-quality-title {
      display: flex;
      font-size: 20px;
      align-items: center;
      margin-bottom: 5px;
      .iconfont {
        color: #e1e1e1;
        font-size: 30px;
        &.high-quality-icon {
          margin-right: 10px;
          position: relative;
          box-sizing: border-box;
          font-size: 14px;
          color: #FFB90F;
          &:after {
            content: "";
            border-radius: 50%;
            width: 20px;
            height: 20px;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;
            border: 1px solid #FFB90F;
            position: absolute;
          }
        }
      }
    }
    .high-quality-name {
      font-size: 16px;
    }
    .high-quality-tips {
      font-size: 12px;
      color: #999;
    }
  }
  .high-quality {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    filter: blur(10px);
    transform: scale(1.1);
    bottom: 0;
    z-index: -1;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: rgba(0, 0, 0, 0.3);
      z-index: 2;
    }
  }
}

</style>
