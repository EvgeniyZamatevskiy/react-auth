import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./api/auth";

import authSlice from "./slices/login";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
