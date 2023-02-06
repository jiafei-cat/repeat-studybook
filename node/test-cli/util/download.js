const download = require('download-git-repo')
const config = require('../config')
const ora = require('ora') // ora v6及以上版本采用ESM规范

const downloadFn = (answer, project) => {
  const spinner = ora().start()
  spinner.text = '正在下载...'
  const { framework } = answer

  download(config.frameworkUrl[framework], project, { clone: true }, error => {
    if (error) {
      console.log(error)
      spinner.fail('下载失败!')
    } else {
      spinner.succeed('下载成功!')
    }
  })
}

module.exports = downloadFn