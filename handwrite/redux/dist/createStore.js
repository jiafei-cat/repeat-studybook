function createStore(reducer, preloadedState, enhancer) {
  let state = {};

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
  }

  dispatch({
    type: `@redux/INIT${Math.random().toString(36)}`
  });
  return {
    getState,
    dispatch
  };
}