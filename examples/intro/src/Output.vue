<template>
  <div id="video" @click="onClick" ref="output">
    <div v-if="time < 2.5">
      <TitleScene :time="time"></TitleScene>
    </div>
    <div v-if="time > 2.0 && time < 6.0" :style="{ 
      opacity: (time - 2)*2,
      filter: `blur(${Math.max(0, time-5.0)*6}px)`
    }">
      <ImageScene :time="time - 2.5"></ImageScene>
    </div>
    <div v-if="time > 5.5 && time < 8" :style="{
      opacity: (time - 5.5)*2,
    }">
      <VideoScene :time="time-5.5"></VideoScene>
    </div>
    <div v-if="time > 7.5" :style="{
      opacity: (time - 7.5)*2,
    }">
      <EndScene :time="time-8.0"></EndScene>
    </div>
  </div>
</template>

<script>
import { state } from "vue-video-renderer"
import TitleScene from "./scenes/TitleScene.vue"
import ImageScene from "./scenes/ImageScene.vue"
import VideoScene from "./scenes/VideoScene.vue"
import EndScene from "./scenes/EndScene.vue"

export default {
  components: { TitleScene, ImageScene, VideoScene, EndScene },
  mounted() {
    const output = this.$refs.output
    state.width = output.clientWidth
    state.height = output.clientHeight
    state.useFastSeek = true
    state.fps = 60
    state.length = 15
  },
  computed: {
    time() {
      return state.time
    }
  },
  methods: {
    onClick() {
      console.log("PLAYING SPEED", state.playingSpeed)
      if(state.playingSpeed > 0) {
        state.playingSpeed = 0
      } else {
        if(state.time == state.length) state.time = 0
        state.playingSpeed = 1
      }
    }
  }
}

</script>

<style>
#video {
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 480px;
  background: black;
  overflow: hidden;
}
#video > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scene {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
