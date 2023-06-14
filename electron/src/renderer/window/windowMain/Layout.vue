<template>
  <LeftBar />
  <div class="pageBox">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import LeftBar from '../../components/LeftBar.vue'
import { ipcRenderer } from 'electron'
import { onMounted } from 'vue'

onMounted(() => {
  /** 为了避免electron白屏加载html，在页面渲染完后才让electron页面显示 */
  ipcRenderer.invoke('showWindow')
})
</script>

<style scoped lang="scss">
.pageBox {
  flex: 1;
  height: 100%;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  margin-top: -1px;
}
</style>
