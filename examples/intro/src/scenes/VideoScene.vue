<template>
  <div class="scene" id="videoScene">
    <div class="backgroundVideo">
      <Video       
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        :time="time+260"
        :style="{
          
        }">
      </Video>
    </div>
    <h1 :style="{ 
      transform: `translate(0, ${(1.0-Math.min(time,1.0)+2.5)*90}%) `+
                 `scale(${Math.max(0,Math.min(time,1.0))})` 
    }">
      Video support!
    </h1>    
  </div>
</template>

<script>
import { state, Video } from "vue-video-renderer"

export default {
  components: { Video },
  props: {
    time: {
      type: Number,
      required: true
    }
  }
}

</script>

<style scoped>
  #videoScene {
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
  .backgroundVideo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  video {        
    height: 100%;  
  }
</style>
