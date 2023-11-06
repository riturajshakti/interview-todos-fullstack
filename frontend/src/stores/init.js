import { configureStore } from '@reduxjs/toolkit'
import todos from './todos'
import application from './application'

export const store = configureStore({
  reducer: {
    todos,
    application
  },
})