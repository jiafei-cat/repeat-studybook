import devPlugin from './plugins/devPlugin'
import optimizerPlugin from './plugins/optimizerPlugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import buildPlugin from './plugins/buildPlugin'

export default defineConfig({
  plugins: [
    optimizerPlugin([
      'os',
      'fs',
      'path',
      'events',
      'child_process',
      'crypto',
      'http',
      'buffer',
      'url',
      'better-sqlite3',
      'knex',
      'electron:clipboard,ipcRenderer,nativeImage,shell,webFrame',
    ]),
    devPlugin(),
    vue(),
  ],
  /** vite build阶段配置 */
  build: {
    rollupOptions: {
      plugins: [buildPlugin()],
    },
  },
})
