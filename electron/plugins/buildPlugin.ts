import BuildObj from './buildObj'

export default () => {
  return {
    name: 'build-plugin',
    /** vite build结束后执行 */
    closeBundle: () => {
      const buildObj = new BuildObj()
      buildObj.buildMain()
      buildObj.preparePackageJson()
      buildObj.buildInstaller()
    },
  }
}
