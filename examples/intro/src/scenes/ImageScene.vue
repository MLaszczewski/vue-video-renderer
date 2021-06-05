<template>
  <div class="scene" id="imageScene">
    <Image src="/camera.jpg" :style="{
      transform: `translate(0, ${(1.0-Math.min(time/2,1.0))*-90}%) `+
                 `rotate(${Math.min(time/2,1.0)*(360)}deg) `+                 
                 `scale(${Math.max(0,Math.min(time/2,1.0))})` 
    }"></Image>
    <h1 :style="{ 
      transform: `translate(0, ${(1.0-Math.min(time,1.0))*90}%) `+
                 `scale(${Math.max(0,Math.min(time,1.0))})` 
    }">
      Static image preload!
    </h1>    
  </div>
  <PreloadImage src="/reel.jpg"></PreloadImage>
</template>

<script>
import { state, Image, PreloadImage } from "vue-video-renderer"

export default {
  components: { Image, PreloadImage },
  props: {
    time: {
      type: Number,
      required: true
    }
  }
}

</script>

<style scoped>
  #imageScene {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: url('/reel.jpg');
    background-position: center;
    background-size: cover;    
  }
  h1 {  
    color: white;
    background: rgba(0,0,0, 0.5);
    border-radius: 50px;
    padding: 20px;
  }
  img {
    width: 60%;
    border-radius: 100px;
  }
</style>
