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

<script setup>

  import { useVideoRendererState } from "../lib/plugin.js"
  import { watch, ref, onMounted, computed } from "vue"
  const state = useVideoRendererState()

  const playingSpeed = ref(1.0)

  const frame = computed(() => state.time * state.fps)
  const isPlaying = computed(() => state.playingSpeed != 0)
  const time = computed(() => state.time || 0)
  const length = computed(() => state.length || 0)
  const frames = computed(() => state.length * state.fps)
  const canForward = computed(() => {
    const step = 1.0 / state.fps
    return (state.time + step <= state.length)
  })
  const canBackward = computed(() => {
    const step = -1.0 / state.fps
    return (state.time + step >= 0)
  })

  const sliderFrame = computed({
    get() {
      return frame.value
    },
    set(frame) {
      state.time = 1.0 * frame / state.fps
    }
  })

  const sliderSpeed = computed({
    get() {
      return Math.log(playingSpeed.value)*10
    },
    set(speed) {
      playingSpeed.value = Math.exp(speed/10)
      state.playingSpeed = playingSpeed.value
    }
  })

  function play() {
    if(state.time == state.length) state.time = 0
    state.playingSpeed = playingSpeed.value
  }
  function pause() {
    state.playingSpeed = 0
  }
  function forward() {
    const step = 1.0 / state.fps
    if(state.time + step <= state.length) state.time += step
  }
  function backward() {
    const step = - 1.0 / state.fps
    if(state.time + step >= 0) state.time += step
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