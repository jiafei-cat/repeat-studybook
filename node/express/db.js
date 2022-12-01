const fs = require('node:fs/promises')
const path = require('path')

exports.getDb = async () => {
  const jsonResult = await fs.readFile(path.resolve(__dirname, './db.json'))
  return JSON.parse(jsonResult)
}

exports.save = async (data) => {
  return await fs.writeFile(path.resolve(__dirname, './db.json'), JSON.stringify(data))
}