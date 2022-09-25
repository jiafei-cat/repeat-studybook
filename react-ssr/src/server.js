import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Routes from './routes'
import { StaticRouter } from 'react-router-dom/server'
import createStoreInstance from './store'
import express from 'express'

// const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('dist/public'))

app.get('*', (req, res) => {
  const store = createStoreInstance()

  const promises = routesConfig?.map((route) => {
    const component = route?.component

    if (route?.path === req?.url && component?.getInitialData) {
      return component?.getInitialData(store)
    } else {
      return null
    }
  })


  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <Routes />
    </StaticRouter>
  )

  const html = `
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <div id="app">${content}</div>
        <script src="bundle_client.js"></script>
      </body>
    </html>
  `
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf8'
  })

  res.end(html)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})