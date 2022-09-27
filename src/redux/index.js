import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/slice"
import {smsAuthApi} from "./api"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [smsAuthApi.reducerPath]: smsAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(smsAuthApi.middleware),
})
