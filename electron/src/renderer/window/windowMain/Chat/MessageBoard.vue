<template>
  <div class="messageBoard">
    <TopBar />

    <div class="messageList">
      <MessageItem :data="item" v-for="item in messageStore.data" :key="item.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '../../../components/TopBar.vue'
import { useMessageStore } from '../../../store/useMessageStore'
import MessageItem from './MessageItem.vue'

const messageStore = useMessageStore()
</script>

<style scoped lang="scss">
.messageBoard {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.messageList {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(245, 245, 245);
}
</style>
