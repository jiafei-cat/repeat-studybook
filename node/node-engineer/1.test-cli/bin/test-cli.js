#! /usr/bin/env node
const { program } = require('commander')
const helpCommand = require('../lib/core/command/help')
const createCommand = require('../lib/core/command/create')

/** 注册命令 */
const registerCommand = () => {
  helpCommand(program)
  createCommand(program)
}

registerCommand()
program.parse(process.argv)
