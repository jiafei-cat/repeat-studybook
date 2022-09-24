import { FETCH_HOME_DATA } from '../consts'

const initialState = {
  articles: [],
}

export default (state = initialState, action) => {
  switch (action?.type) {
    case FETCH_HOME_DATA:
      return action.payload
    default:
      return state
  }
}
