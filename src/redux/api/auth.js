import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:1488/user/auth/sms/",
  }),
  endpoints: (build) => ({
    sendCode: build.mutation({
      query: (phoneNumber) => ({
        method: "POST",
        body: { phoneNumber },
      }),
    }),
    phoneNumberVerification: build.mutation({
      query: (data) => ({
        url: data.code,
        method: "POST",
        body: { token: data.token },
      }),
    }),
  }),
});

export const { useSendCodeMutation, usePhoneNumberVerificationMutation } =
  authApi;
