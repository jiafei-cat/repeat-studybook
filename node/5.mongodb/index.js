const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const clientFn = async (collect) => {
  await client.connect()
  const db = client.db('test')
  return db.collection(collect)
}

const main = async () => {
  const cc = await clientFn('aa')
  await cc.insertOne({ a: 11111 })
}

main().finally(() => client.close())