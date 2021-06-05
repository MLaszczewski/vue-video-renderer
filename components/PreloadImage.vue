<template>
</template>

<script>

export default {
  name: "PreloadImage",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      uid: Math.random()      
    }
  },
  watch: {
    src() {
      this.waitForReady()
    }
  },
  mounted() {
    this.image = new Image()
    this.image.src = this.src
    this.waitForReady()
  },
  methods: {
    waitForReady() {
      const image = this.image
      image.onload = () => this.handleLoad()
      if(!image.complete) {      
        if(state.notReady.indexOf(this.uid) == -1) {
          state.notReady.push(this.uid)
        }
      }
    },
    handleLoad() {
      const index = state.notReady.indexOf(this.uid)
      if(index!=-1) state.notReady.splice(index, 1)
    }
  }

}
</script>
