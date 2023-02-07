const inquirer = require('inquirer') // v8版本以上是ESM, 所以使用低版本就好
const config = require('../../../config')
const downloadFn = require('../../../util/download')

/**
 * 创建项目
 * @param {*} project 项目目录名称
 * @param {*} args 
 */
const createAction = async (project, args) => {
  const answer = await inquirer.prompt([{
    type: 'list',
    name: 'framework',
    choices: config.framework,
    message: '请选择使用的框架',
  }])
  downloadFn(answer, project)
}

module.exports = createAction