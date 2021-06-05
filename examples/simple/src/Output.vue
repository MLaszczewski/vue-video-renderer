<template>
  <div id="video" @click="onClick" ref="output">
    <img 
      alt="Vue logo" src="./assets/logo.png"
      :style="{
        opacity: time-4.5,
        filter: time > 4.5 ? `blur(${40-(time-4.5)*60}px)` : ''
      }"
    />
    <Video     
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      :time="time+250"
      :style="{
        position: 'absolute',
        visibility: time < 2.5 ? 'visible' : 'hidden',
        left: `${-70+time*10}%`,
        top: 0,
        width: `${200-time*10}%`,         
      }">
    </Video>
    <Video    
      v-if="time > 1.6"
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      :time="time+260"
      :style="{
        position: 'absolute',
        visibility: (time > 2.0 && time < 5.0) ? 'visible' : 'hidden',
        left: `${Math.max(-10, 100-(time-2.0)*200)}%`,
        opacity: 1 - (time - 4),
        top: 0,
        width: `150%`,
        filter: `blur(${(time-4.1)*3}px)` 
      }">
    </Video>
  </div>
</template>

<script>
import { state, Video } from "vue-video-renderer"

export default {
  components: { Video },
  mounted() {
    const output = this.$refs.output
    state.width = output.clientWidth
    state.height = output.clientHeight
    state.useFastSeek = true
    state.fps = 60
    state.length = 7
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
