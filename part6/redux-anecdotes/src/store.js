import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer.js'
import anecdoteReducer from './reducers/anecdoteReducer'




const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    
    
  },
})


 

export default store