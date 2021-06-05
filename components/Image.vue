<template>
  <img ref="image" :src="src" :key="src" @load="handleLoad" />
</template>

<script>

export default {
  name: "Image",
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
    this.waitForReady()
  },
  methods: {
    waitForReady() {
      const image = this.$refs.image
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