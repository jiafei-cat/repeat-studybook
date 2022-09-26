import { FETCH_ABOUT_DATA } from '../consts'

const initialState = {
  userInfo: {},
}

export default (state = initialState, action) => {
  switch (action?.type) {
    case FETCH_ABOUT_DATA:
      return action.payload
    default:
      return state
  }
}
