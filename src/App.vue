<template>
  <div id="app">
    <global-audio ref="audioElement"></global-audio>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import globalAudio from 'common/audio';
export default {
  name: 'app',
  components: {
    globalAudio
  }
};

</script>
<style>
html,
body {
  height: 100%;
}

.router-slid-enter-active,
.router-slid-leave-active {
  transition: all .2s;
}

.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

</style>
