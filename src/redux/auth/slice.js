import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  timeToResubmit: 60,
  code: null,
  isPhoneNumberVerification: false,
  phoneNumber: null
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
    },
    sendCodeToPhoneNumber(state, action) {
      state.phoneNumber = action.payload
    },
    setPhoneNumberVerification(state, action) {
      state.isPhoneNumberVerification = action.payload
    },
  },
})

export const {
  setTimeToResubmit,
  resetTimeToResubmit,
  setCode,
  sendCodeToPhoneNumber,
  setPhoneNumberVerification
} = authSlice.actions

export default authSlice.reducer
