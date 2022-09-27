export default function reduxThunk(middlewareAPI) {
  const { dispatch, getState } = middlewareAPI
  return (nextDispatch) => {
    return (action) => {
      if (typeof action === 'function') {
        action(nextDispatch, getState)
      }

      nextDispatch(action)
    }
  }
}