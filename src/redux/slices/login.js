import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeToResubmit: 60,
  code: "",
  errorMessage: "",
  phoneNumberVerificationStatus: "idle",
  phoneNumber: "",
  authStatus: "auth",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTimeToResubmit(state) {
      state.timeToResubmit = state.timeToResubmit - 1;
    },
    resetTimeToResubmit(state) {
      state.timeToResubmit = 60;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setPhoneNumberVerificationStatus(state, action) {
      state.phoneNumberVerificationStatus = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
  },
});

export const {
  setTimeToResubmit,
  resetTimeToResubmit,
  setCode,
  setPhoneNumber,
  setPhoneNumberVerificationStatus,
  setToken,
  setAuthStatus,
} = authSlice.actions;

export default authSlice.reducer;
