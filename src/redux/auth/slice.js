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
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload
    },
    setPhoneNumberVerificationStatus(state, action) {
      state.phoneNumberVerificationStatus = action.payload
    },
  },
})

export const {
  setTimeToResubmit,
  resetTimeToResubmit,
  setCode,
  setPhoneNumber,
  setPhoneNumberVerificationStatus
} = authSlice.actions

export default authSlice.reducer
