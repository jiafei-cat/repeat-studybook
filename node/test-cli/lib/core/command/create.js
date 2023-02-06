const createAction = require('../actions/create')
const create = (program) => {
  program
  .command('create <project> [other...]') // <>是必填，[]是可选
	.alias('crt') // 命令别名
	.description('创建项目') // 命令说明
	.action((project, args) => {
    createAction(project, args)
  })
}

module.exports = create