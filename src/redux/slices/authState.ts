import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface fetchProps {
  username: string
  password: string
}

interface IAuthState extends fetchProps{
  logIn: boolean
  access_token: string
}

const initialState: IAuthState = {
  username: '',
  password: '',
  logIn: !!localStorage.getItem('logIn') || false,
  access_token: localStorage.getItem("access_token") || ''
}

export const fetchAccessToken = createAsyncThunk<string, fetchProps>(
  'auth/fetchAccess_token',
  async ({username, password}) => {
    const response = await axios.post(
      `https://front-test.hex.team/api/login`,
      {
        username: username,
        password: password
      }
    )
    const access_token = response.data.access_token

    localStorage.setItem("access_token", access_token)
    return access_token
  }
)

const authSlice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {
    setUsername (state, action) {
      state.username = action.payload
    },
    setPassword (state, action) {
      state.password = action.payload
    },
    setLogIn (state, action) {
      state.logIn = action.payload
      localStorage.setItem('logIn', action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
      state.access_token = action.payload
    })
  }
})

export const { setUsername, setPassword, setLogIn} = authSlice.actions;

export default authSlice.reducer;