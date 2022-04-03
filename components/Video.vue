<template>
  <video ref="video" :src="src" :key="src" @seeked="handleSeeked"></video>
</template>

<script setup>

  import { useVideoRendererState } from "../lib/plugin.js"
  import { watch, ref, onMounted, computed } from "vue"

  const state = useVideoRendererState()

  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      default: 0
    }
  })

  const uid = Math.random()
  const video = ref(null)

  function checkReadyState() {
    if(!video) {
      setTimeout(() => checkReadyState(), 10)
      return
    }
    const readyState = video.value.readyState
    // //console.log("READY STATE", readyState)
    if(readyState >= 3) {
      const index = state.notReady.indexOf(uid)
      if(index!=-1) state.notReady.splice(index, 1)
    } else {
      setTimeout(() => checkReadyState(), 10)
    }
  }

  function handleSeeked() {
    const index = state.notReady.indexOf(uid)
    if(index!=-1) state.notReady.splice(index, 1)
  }

  function waitForReady() {
    const readyState = video.value.readyState
    if(readyState < 3) {
      if(state.notReady.indexOf(uid) == -1) {
        state.notReady.push(uid)
        setTimeout(() => checkReadyState(), 10)
      }
    }
  }

  const playbackRate = computed(() => state.playingSpeed)

  watch(() => playbackRate.value, (rate, oldRate) => {
    if(rate <= 0 && oldRate <= 0 ) return
    if(oldRate <= 0 && rate > 0) {
      video.value.playbackRate = rate
      video.value.play()
    } else if(rate <= 0 && oldRate > 0) {
      video.value.pause()
    } else {
      video.value.playbackRate = rate
    }
  })

  watch(() => props.time, (time) => {
    if(playbackRate == 0) {
      if(state.useFastSeek && video.fastSeek) {
        video.value.fastSeek(time)
      } else {
        video.value.currentTime = time
      }
    } else {
      const diff = video.currentTime - time
      if(Math.abs(diff) > 0.2) {
        console.log("DIFF", diff)
        if(video.value.fastSeek)  {
          video.value.fastSeek(time)
        } else {
          video.value.currentTime = time
        }
      }
    }
    waitForReady()
  })

  watch(() => props.volume, volume => video.value.volume = volume)

  watch(() => props.src, () => waitForReady())

  onMounted(() => {
    video.value.currentTime = props.time
    video.value.volume = props.volume
    waitForReady()
  })

</script>
