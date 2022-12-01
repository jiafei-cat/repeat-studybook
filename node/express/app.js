const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const db = require('./db')

const app = express()

// app.use(express.urlencoded()) // body parser - json
app.use(express.json()) // body parser - json

app.get('/', async (req, res) => {
  try {
    const dbJson = await db.getDb()
    res.send(dbJson)
  } catch (err) {
    res.status(500).send(JSON.stringify(err))
  }
})

app.post('/', async (req, res) => {
  const bodyParams = req.body
  if (!bodyParams?.username || !bodyParams?.age) {
    res.status(403).json({
      error: '缺少必要参数'
    })
    return
  }

  const userDb = await db.getDb()

  const lastId = userDb.users[userDb.users.length - 1]?.id || 0
  bodyParams.id = lastId + 1

  userDb.users.push(bodyParams)
  try {
    const result = await db.save(userDb)
    if (!result) {
      res.status(200).json({
        data: {
          id: lastId + 1,
        },
        message: 'success'
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

app.put('/:id', async (req, res) => {
  const id = Number(req.params?.id)
  if (!id) {
    res.status(403).json({
      error: '缺少必要参数'
    })
    return
  }

  try {
    const dbJson = await db.getDb()

    
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(3000, () => {
  console.log('App run at: http://127.0.0.1:3000')
})