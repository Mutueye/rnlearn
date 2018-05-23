import { combineReducers } from 'redux'
import people from './people'

const rootReducer = combineReducers({
  charactersData : people
})

export default rootReducer
