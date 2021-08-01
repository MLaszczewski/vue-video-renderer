<template>
  <div class="video-controls">
    <input type="range" min="0" :max="frames" v-model="sliderFrame" class="positionSlider">
    <div class="buttons">
      <button v-if="isPlaying" @click="pause">⏸</button>
      <button v-else @click="play">⏵</button>
      <button @click="backward" :disabled="!canBackward">⏮</button>
      <button @click="forward" :disabled="!canForward">⏭</button>
      <input type="range" min="-20" :max="20" v-model="sliderSpeed" class="speedSlider">
      <span class="speed">speed: {{ playingSpeed.toFixed(1) }}x</span>
      <span class="time">time: {{ time.toFixed(3) }}s / {{ length.toFixed(3) }}s</span>
      <span class="frame">frame: {{ frame.toFixed() }} / {{ frames.toFixed() }}</span>
    </div>
  </div>
</template>

<script>
import state from "../lib/state.js"

export default {
  name: "VideoControls",
  data () {
    return {
      playingSpeed: 1.0
    }
  },
  computed: {
    sliderFrame: {
      get() {
        return this.frame
      },
      set(frame) {
        state.time = 1.0 * frame / state.fps
      }
    },
    sliderSpeed: {
      get() {
        return Math.log(this.playingSpeed)*10
      },
      set(speed) {
        this.playingSpeed = Math.exp(speed/10)
        //state.time = 1.0 * frame / state.fps
      }
    },
    isPlaying() {
      return state.playingSpeed != 0
    },
    time() {
       return state.time
    },
    length() {
      return state.length
    },
    frame() {
      return state.time * state.fps
    },
    frames() {
      return state.length * state.fps
    },
    canForward() {
      const step = 1.0 / state.fps
      return (state.time + step <= state.length)
    },
    canBackward() {
      const step = -1.0 / state.fps
      return (state.time + step >= 0)
    }
  },
  methods: {
    play() {
      if(state.time == state.length) state.time = 0
      state.playingSpeed = this.playingSpeed
    },
    pause() {
      state.playingSpeed = 0
    },
    forward() {
      const step = 1.0 / state.fps
      if(state.time + step <= state.length) state.time += step
    },
    backward() {
      const step = - 1.0 / state.fps
      if(state.time + step >= 0) state.time += step
    }
  }
}
</script>

<style scoped>
  .video-controls .positionSlider {
    margin-bottom: 10px;
    width: 100%;
  }
  .video-controls .buttons {
    display: flex;
    align-items: center;
    height: 35px;
  }
  .video-controls button {
    width: 35px;
    height: 35px;
    font-size: 20px;
  }

  .video-controls .buttons > span {
    margin-left: 1em;
    margin-right: 1em;
  }

  .video-controls .buttons .speed {
    width: 120px;
  }
  .video-controls .buttons .time {
    width: 200px;
  }
  .video-controls .buttons .frame {
    width: 200px;
  }
  .video-controls .buttons .speedSlider {
    margin-left: 2em;
  }

</style>