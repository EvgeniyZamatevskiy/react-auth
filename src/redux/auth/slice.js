import {createSlice} from "@reduxjs/toolkit"
import {EMPTY_STRING} from "../../const"

const initialState = {
  timeToResubmit: 60,
  code: EMPTY_STRING,
  phoneNumberVerificationStatus: "idle",
  phoneNumber: EMPTY_STRING
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
