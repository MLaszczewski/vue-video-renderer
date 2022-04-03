<template>
  <img ref="image" :src="props.src" :key="props.src" @load="handleLoad" />
</template>

<script setup>

  import { useVideoRendererState } from "../lib/plugin.js"
  import { watch, ref, onMounted } from "vue"

  const state = useVideoRendererState()

  const props = defineProps({
    src: {
      type: String,
      required: true
    }
  })
  const uid = Math.random()

  const image = ref(null)

  function waitForReady() {
    if(!image.value.complete) {
      if(state.notReady.indexOf(uid) == -1) {
        state.notReady.push(uid)
      }
    }
  }

  function handleLoad() {
    const index = state.notReady.indexOf(uid)
    if(index != -1) state.notReady.splice(index, 1)
  }

  watch(() => props.src, () => waitForReady())
  onMounted(() => waitForReady())

</script>