function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const reducersKeys = Object.keys(reducers);
    const nextState = {};

    for (let i = 0; i < reducersKeys.length; i++) {
      const key = reducersKeys[i];
      const previousStateForKey = state[key];
      const reducer = reducers[i];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
}