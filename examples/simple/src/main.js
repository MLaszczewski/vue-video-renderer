import { createApp } from 'vue'
import Output from './Output.vue'
import { videoRendererPlugin } from "vue-video-renderer"

const app = createApp(Output)
app.use(videoRendererPlugin)
app.mount('#app')
