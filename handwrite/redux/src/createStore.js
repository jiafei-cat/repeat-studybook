function createStore(reducer, preloadedState, enhancer) {
  let state = preloadedState
  const listeners = []

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)

    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    for(let i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
  }

  dispatch({ type: `@redux/INIT${Math.random().toString(36)}`})

  return {
    getState,
    dispatch,
    subscribe,
  }
}

export default createStore