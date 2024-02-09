import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type StatProps = {
  id: number,
  short: "string",
  target: "string",
  counter: number
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface IStatState {
  items: StatProps[];
  status: Status
  totalCount: number
}

type FetchProps = {
  access_token: string
  sortProperty: string
  currentPage: number
}

type FetchReturn = {
  data: StatProps[]
  count: number
}

const initialState: IStatState = {
  items: [],
  status: Status.LOADING,
  totalCount: 0
}

export const fetchStatistics = createAsyncThunk<FetchReturn, FetchProps>(
  'statistics/fetchPizzasStatus',
  async ({access_token, sortProperty, currentPage}) => {
    const { data, headers } = await axios.get<StatProps[]>(
      `https://front-test.hex.team/api/statistics?order=${sortProperty}&offset=${currentPage}&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }
      )
    const count = Number(headers['x-total-count'])
    return {data, count}
  }
)

const statSlice = createSlice ({
  name: 'statistics',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<StatProps[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatistics.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
      state.totalCount = 0
    })
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload.data
      state.totalCount = action.payload.count
    })
    builder.addCase(fetchStatistics.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
      state.totalCount = 0
    })
  }
})

export const { setItem } = statSlice.actions;

export default statSlice.reducer;