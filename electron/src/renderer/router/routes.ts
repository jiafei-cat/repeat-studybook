import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/windowMain/chat' },
  {
    path: '/windowMain',
    component: () => import('../window/windowMain/Layout.vue'),
    children: [
      { path: 'chat', component: () => import('../window/windowMain/Chat/Index.vue') },
      { path: 'contact', component: () => import('../window/windowMain/Contact.vue') },
      { path: 'collection', component: () => import('../window/windowMain/Collection.vue') },
    ],
  },
  {
    path: '/windowSetting',
    component: () => import('../window/windowSetting/Layout.vue'),
    children: [{ path: 'accountSetting', component: () => import('../window/windowSetting/AccountSetting.vue') }],
  },
  {
    path: '/windowUserInfo',
    component: () => import('../window/WindowUserInfo.vue'),
  },
]

export default routes
