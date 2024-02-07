import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type statProps = {
  id: number,
  "short": "string",
  "target": "string",
  "counter": number
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface StatState {
  items: statProps[];
  status: Status
}

const initialState: StatState = {
  items: [],
  status: Status.LOADING,
}

export const fetchStatistics = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async () => {
    const { data } = await axios.get<statProps[]>("https://front-test.hex.team/api/statistics?offset=0&limit=0",
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      )
    console.log(`Bearer ${localStorage.getItem('access_token')}`)
    return data
  }
)

const statSlice = createSlice ({
  name: 'statistics',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<statProps[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatistics.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchStatistics.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const { setItem } = statSlice.actions;

export default statSlice.reducer;