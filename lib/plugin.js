import { getCurrentInstance } from 'vue'

const videoRendererPlugin = {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$videoRendererState = state
  }
}

function useVideoRendererState(context) {
  context = context || getCurrentInstance().appContext
  return context.config.globalProperties.$videoRendererState
}

export { videoRendererPlugin, useVideoRendererState }
