import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  timeToResubmit: 60,
  code: 0
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTimeToResubmit(state) {
      state.timeToResubmit = state.timeToResubmit - 1
    },
    resetTimeToResubmit(state) {
      state.timeToResubmit = 60
    },
    setCode(state, action) {
      state.code = action.payload
    }
  },
})

export const {
  setTimeToResubmit,
  resetTimeToResubmit,
  setCode,
} = authSlice.actions

export default authSlice.reducer
