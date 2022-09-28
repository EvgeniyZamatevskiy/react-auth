import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeToResubmit: 60,
  code: "",
  errorMessage: "",
  phoneNumberVerificationStatus: "idle",
  phoneNumber: "",
  authStatus: "auth",
  SMSCodeToken: "",
  countryCode: "RU",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    decreaseTimeToResubmit: (state) => {
      state.timeToResubmit -= 1;
    },
    resetTimeToResubmit: (state) => {
      state.timeToResubmit = 60;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCountryCode: (state, action) => {
      state.dialCode = action.payload;
    },
    setPhoneNumberVerificationStatus: (state, action) => {
      state.phoneNumberVerificationStatus = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSMSCodeToken: (state, action) => {
      state.SMSCodeToken = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});

export const {
  decreaseTimeToResubmit,
  resetTimeToResubmit,
  setCode,
  setPhoneNumber,
  setCountryCode,
  setPhoneNumberVerificationStatus,
  setErrorMessage,
  setSMSCodeToken,
  setAuthStatus,
} = authSlice.actions;

export default authSlice.reducer;
