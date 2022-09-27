import {createSlice} from "@reduxjs/toolkit"
import {EMPTY_STRING} from "../../../const"
import {smsAuthApi} from "../../api/smsAuthApi"

const initialState = {
  timeToResubmit: 60,
  code: EMPTY_STRING,
  errorMessage: EMPTY_STRING,
  phoneNumberVerificationStatus: "idle",
  phoneNumber: EMPTY_STRING,
  authStatus: "auth",
  token: EMPTY_STRING,
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
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        smsAuthApi.endpoints.sendCode.matchFulfilled,
        (state, {payload}) => {
          state.token = payload.token
          state.authStatus = "enterCode"
        }
      )
      .addMatcher(
        smsAuthApi.endpoints.phoneNumberVerification.matchFulfilled,
        (state, {payload}) => {
          state.phoneNumberVerificationStatus = "success"
        }
      )
      .addMatcher(
        smsAuthApi.endpoints.phoneNumberVerification.matchRejected,
        (state, {payload}) => {
          state.errorMessage = "Неверные данные доступа"
          state.phoneNumberVerificationStatus = "error"
        }
      )
  },
})

export const {
  setTimeToResubmit,
  resetTimeToResubmit,
  setCode,
  setPhoneNumber,
  setErrorMessage,
  setPhoneNumberVerificationStatus
} = authSlice.actions

export default authSlice.reducer
