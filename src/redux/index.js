import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/slice"
import {authApi} from "../services/CodeService"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})
