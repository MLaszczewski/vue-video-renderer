<template>
  <div class="scene" id="titleScene">
    <h1 :style="{ transform: `scale(${0.7+time*0.5})`, opacity: 1.6-time*0.7 }">
      Vue Video Renderer
    </h1>
  </div>
</template>

<script>
import { state } from "vue-video-renderer"

export default {
  props: {
    time: {
      type: Number,
      required: true
    }
  }
}

</script>

<style scoped>
  #titleScene {
    background: rgb(131,58,180);
    background: linear-gradient(0deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;    
  }
  h1 {
    color: white;
    
  }
</style>
