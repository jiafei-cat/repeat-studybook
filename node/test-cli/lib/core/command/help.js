const help = program => {
  program.option('-f --framwork <framwork>', '选择框架')
  program.helpOption('-h, --help', '命令帮助信息')
}

module.exports = help