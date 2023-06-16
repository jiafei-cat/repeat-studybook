<template>
  <section>
    <TopBar />
    layout
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TopBar from '../../components/TopBar.vue'
import { childWindowMounted } from '../../common/browser'

onMounted(() => {
  childWindowMounted()
})
</script>
