import { reactive, watch } from "vue"

const state = reactive({
  time: 0, // in seconds
  ready: false,
  notReady: [],
  playingSpeed: 0, // in seconds/seconds
  length: 0,
  fps: 60,
  alpha: false,
  useFastSeek: false
})

let animationTimestamp = 0
watch(() => state.playingSpeed, (n, o) => {
  if(n != 0 && o == 0) {
    animationTimestamp = 0
    requestAnimationFrame(step)
  }
}) 

function step(timestamp) {
  if(!state.playingSpeed) return
  if(animationTimestamp) {
    const diff = timestamp - animationTimestamp
    let nextTime = state.time + state.playingSpeed * diff / 1000
    if(nextTime < 0) {
      nextTime = 0
      state.playingSpeed = 0
    }
    if(nextTime > state.length) {
      nextTime = state.length
      state.playingSpeed = 0
    }
    state.time = nextTime
  }
  animationTimestamp = timestamp   
  requestAnimationFrame(step)
}

requestAnimationFrame(step)

window.state = state
console.error("STATE!", state)
export default state