import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/user'
import updateReducer from './reducers/update'


const rootReducer = combineReducers({
    user : userSlice.reducer,
    update: updateReducer.reducer
})

export const store = configureStore({
  reducer: rootReducer
})
export default store