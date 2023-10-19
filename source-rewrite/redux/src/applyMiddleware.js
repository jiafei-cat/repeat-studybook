import compose from './compose'
export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    
    const middlewareAPI = {
      getState: store.getState,
      dispatch: store.dispatch,
    }

    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}