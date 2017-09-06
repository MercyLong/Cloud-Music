<template>
  <div class="song-player-wrapper">
    <div class="song-player-bg"></div>
    <div class="song-player-info">
      <div class="song-player-disk-wrapper">
        <div class="song-player-disk">
          <div class="song-player-disk-turn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchSongDetail } from 'service';
export default {
  created() {
    this.songId = this.$route.query.id;
    if (!this.songId) {
      this.$router.push('/');
    }
  },
  methods: {
    async initSongDetailInfo() {
      var res = await fetchSongDetail(this.songId);
      console.log(res);
    }
  },
  mounted() {
    this.initSongDetailInfo();
  }
};

</script>
<style lang="less">
.song-player-wrapper {
  height: 100%;
  min-width: 320px;
  position: relative;
  overflow: hidden;
  .song-player-info {
    .song-player-disk-wrapper {
      padding-top: 70px;
      .song-player-disk {
        position: relative;
        @media screen and (min-width: 360px) {
          width: 296px;
          height: 296px;
        }
        width: 248px;
        height: 248px;
        margin: 0 auto;
        &:after {
          @media screen and (min-width: 360px) {
            width: 96px;
            height: 137px;
            top: -70px;
            left: 133px;
            background-image: url(//s3.music.126.net/m/s/img/needle-ip6.png?be4ebbe…);
          }
          content: " ";
          position: absolute;
          top: -63px;
          left: 107px;
          z-index: 5;
          width: 84px;
          height: 122px;
          background: url(//s3.music.126.net/m/s/img/needle.png?702cf6d…) no-repeat;
          background-size: contain;
        }
        .song-player-disk-turn {
          width: 100%;
          height: 100%;
          &:before,
          &:after {
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
          &:before {
            @media screen and (min-width: 360px) {
              background-image: url(//s3.music.126.net/m/s/img/disc-ip6.png?6979612…);
            }
            z-index: 2;
            background: url(//s3.music.126.net/m/s/img/disc.png?d3bdd10…) no-repeat;
            background-size: contain;
          }
          &:after {
            @media screen and (min-width: 360px) {
              background-image: url(//s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a…);
            }
            z-index: 3;
            background: url(//s3.music.126.net/m/s/img/disc_light.png?2bb24f3…) no-repeat;
            background-size: contain;
            -webkit-animation: circling 20s infinite linear;
            animation: circling 20s infinite linear;
          }
        }
      }
    }
  }
  .song-player-bg {
    background-image: url(//music.163.com/api/img/blur/109951163018963706);
    opacity: 1;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-transform-origin: center top;
    transform-origin: center top;
    z-index: -1;
    transition: opacity .3s linear;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: " ";
      background-color: rgba(0, 0, 0, .5);
    }
  }
}

</style>
