import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/mainSlice'

const store = configureStore({reducer})

export default store