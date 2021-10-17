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

const requestAnimationFrame = typeof window == 'undefined' ? () => {} : cb => window.requestAnimationFrame(cb)

let animationTimestamp = 0
if(typeof window != 'undefined') watch(() => state.playingSpeed, (n, o) => {
  if(n != 0 && o == 0) {
    animationTimestamp = 0
    requestAnimationFrame(step)
  }
})

function step(timestamp) {
  if(typeof window == 'undefined')  return
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

if(typeof window != 'undefined') requestAnimationFrame(step)

state.setReady = function(uid, ready) {
  console.log("SET READY STATE", uid, ready)
  if(!ready) {
    if(state.notReady.indexOf(uid) == -1) {
      state.notReady.push(uid)
    }
  } else {
    const index = state.notReady.indexOf(uid)
    if(index!=-1) state.notReady.splice(index, 1)
  }
}

if(typeof window != 'undefined') window.state = state
console.error("STATE!", state)
export default state