<template>
  <div class="scene" id="endScene" :style="{
      filter: `hue-rotate(${time*400}deg)`
    }">
    <div class="content">
      <h1>
        Create stunning videos with code!
      </h1>
      <h2>
        Features:
      </h2>
      <ul>
        <li>
          Real-time preview with Vite
        </li>
        <li>
          Video rendering with Playwright
        </li>
        <li>
          Video and Images support!
        </li>
      </ul>      
      
    </div>
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
  #endScene {
    background:radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0,40,0,1) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content {
    max-width: 80%
  }
  h1 {
    color: rgba(255, 200, 200);    
    text-align: center;
  }
  h2 {
    color: rgba(200, 255, 200);
  }
  ul {
    color: rgba(200, 200, 255);
    font-size: 1.7em;
  }
</style>
