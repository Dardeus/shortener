import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import statReducer from './slices/statisticSlice'

export const store = configureStore({
  reducer: {
    statistics: statReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()