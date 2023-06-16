<template>
  <div class="BarLeft">
    <div class="userIcon">
      <img
        src="https://p3-passport.byteimg.com/img/user-avatar/dbe68af40bc02e65b8f1ff4a191c1ad8~100x100.awebp"
        alt=""
      />
    </div>
    <div class="menu">
      <router-link
        v-for="item in mainWindowRoutes"
        :to="item.path"
        :class="[`menuItem`, { selected: item.isSelected }]"
      >
        <i :class="[`icon`, item.isSelected ? item.iconSelected : item.icon]"></i>
      </router-link>
    </div>
    <div @click="openSettingWindow" class="setting">
      <div class="menuItem">
        <i class="icon icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { createChildWindow } from '../common/browser'

/** 左侧菜单控制项 */
const mainWindowRoutes = ref([
  {
    path: `/windowMain/chat`,
    isSelected: true,
    icon: `icon-chat`,
    iconSelected: `icon-chat`,
  },
  {
    path: `/windowMain/contact`,
    isSelected: false,
    icon: `icon-tongxunlu1`,
    iconSelected: `icon-tongxunlu`,
  },
  {
    path: `/windowMain/collection`,
    isSelected: false,
    icon: `icon-shoucang1`,
    iconSelected: `icon-shoucang`,
  },
])

const route = useRoute()

/** 监听路由变化，切换菜单的选择态 */
watch(
  () => route,
  () => mainWindowRoutes.value.forEach((v) => (v.isSelected = v.path === route.fullPath)),
  {
    immediate: true,
    deep: true,
  }
)

const openSettingWindow = async () => {
  const config = { show: true, modal: true, width: 800, webPreferences: { webviewTag: false } }
  await createChildWindow(`/windowSetting/accountSetting`, config)
}
</script>

<style scoped lang="scss">
.BarLeft {
  width: 54px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(46, 46, 46);
  -webkit-app-region: drag;
}
.userIcon {
  height: 84px;
  padding-top: 36px;
  box-sizing: border-box;
  img {
    width: 34px;
    height: 34px;
    margin-left: 10px;
  }
}
.menu {
  flex: 1;
}
.menuItem {
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
  display: block;
  text-decoration: none;
  color: rgb(126, 126, 126);
  cursor: pointer;
  -webkit-app-region: no-drag;
  i {
    font-size: 22px;
  }
  &:hover {
    color: rgb(141, 141, 141);
  }
}
.selected {
  color: rgb(7, 193, 96);
  &:hover {
    color: rgb(7, 193, 96);
  }
}
.setting {
  margin-bottom: 5px;
}
</style>
