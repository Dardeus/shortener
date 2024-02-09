import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
  activeSort: {name: 'короткой ссылке (+)', sortProperty: 'asc_short'},
}

const filterSlice = createSlice ({
  name: 'filter',
  initialState,
  reducers: {
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
})

export const { setActiveSort, setCurrentPage,} = filterSlice.actions;

export default filterSlice.reducer;