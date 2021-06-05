<template>
  <video ref="video" :src="src" :key="src" @seeked="handleSeeked"></video>
</template>

<script>
import state from "../lib/state.js"

export default {
  name: "Video",
  props: {
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
  },
  data() {
    return {
      uid: Math.random()
    }
  },
  computed: {
    playbackRate() {
      return state.playingSpeed
    }
  },
  watch: {
    playbackRate(rate, oldRate) {
      if(rate <= 0 && oldRate <= 0 ) return                
      if(oldRate <= 0 && rate > 0) {
        this.$refs.video.playbackRate = rate
        this.$refs.video.play()
      } else if(rate <= 0 && oldRate > 0) {
        this.$refs.video.pause()
      } else {
        this.$refs.video.playbackRate = rate
      }
    },  
    time(time) {
      const video = this.$refs.video
      if(this.playbackRate == 0) {
        if(state.useFastSeek && video.fastSeek) {
          video.fastSeek(this.time)          
        } else {
          video.currentTime = this.time
        }        
      } else {
        const diff = this.$refs.video.currentTime - this.time
        if(Math.abs(diff) > 0.2) {
          console.log("DIFF", diff)
          if(video.fastSeek)  {
            video.fastSeek(this.time)
          } else {
            video.currentTime = this.time
          }
        }
      }
      this.waitForReady()      
    },    
    volume(volume) {
      const video = this.$refs.video
      video.volume = volume
    },
    src() {
      this.waitForReady()
    }
  },
  mounted() {
    const video = this.$refs.video
    video.currentTime = this.time
    video.volume = this.volume
    this.waitForReady()
  },
  methods: {
    waitForReady() {
      const video = this.$refs.video
      const readyState = video.readyState
      if(readyState < 3) {      
        if(state.notReady.indexOf(this.uid) == -1) {
          state.notReady.push(this.uid)
           setTimeout(() => this.checkReadyState(), 10)
         }
      }
    },
    checkReadyState() {
      const video = this.$refs.video
      if(!video) {
        setTimeout(() => this.checkReadyState(), 10)
        return
      }
      const readyState = video.readyState
      // //console.log("READY STATE", readyState)      
      if(readyState >= 3) {
        const index = state.notReady.indexOf(this.uid)
        if(index!=-1) state.notReady.splice(index, 1)
      } else {
        setTimeout(() => this.checkReadyState(), 10)
      }
    },
    handleSeeked() {
      const index = state.notReady.indexOf(this.uid)
      if(index!=-1) state.notReady.splice(index, 1)
    }
  }

}
</script>
