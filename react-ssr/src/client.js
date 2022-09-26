import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import createStoreInstance from './store/index'

window.onload = () => {
  const preStoreState = JSON.parse(document.getElementById('__NEXT_DATA__').textContent)
  const store = createStoreInstance(preStoreState)

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
  )
}