export default function reduxLogger(middlewareAPI) {
  const { dispatch, getState } = middlewareAPI

  return (nextDispatch) => {
    return (action) => {
      const preState = getState()
      nextDispatch(action)
      const curtate = getState()

      console.log('pre state', preState)
      console.log(action)
      console.log('cur state', curtate)
    }
  }
}