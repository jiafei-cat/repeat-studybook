import { combineReducers } from 'redux'
import homeReducer from './home'
import aboutReducer from './about'

export default combineReducers({
  home: homeReducer,
  about: aboutReducer,
})
