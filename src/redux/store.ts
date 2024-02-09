import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import statReducer from './slices/statisticSlice'
import authReducer from './slices/authState'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    statistics: statReducer,
    auth: authReducer,
    filter: filterReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()