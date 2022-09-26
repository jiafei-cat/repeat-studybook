import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Routes, { routesConfig } from './routes'
import { StaticRouter } from 'react-router-dom/server'
import createStoreInstance from './store'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

const express = require('express')


const app = express()
const port = process.env.PORT || 3000

app.use(express.static('dist/public'))

app.get('*', async (req, res) => {
  const store = createStoreInstance()
  
  /** 执行 getServerSideProps */
  const promises = routesConfig?.map((route) => {
    const component = route?.Component
    if (route?.path === req?.url && component?.getServerSideProps) {
      console.log(store)
      return component?.getServerSideProps(store)
    } else {
      return null
    }
  })

  await Promise.all(promises)

  const preStoreState = store.getState()

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <Routes />
      </StaticRouter>
    </Provider>
  )

  const helmet = Helmet.renderStatic()

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
      ${helmet?.title}
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="bundle_client.js"></script>
        <script id="__NEXT_DATA__" type="application/json">
        ${JSON.stringify(preStoreState)}
        </script>
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