import React, { useEffect } from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  usePhoneNumberVerificationMutation,
  useSendCodeMutation,
} from "../../redux/api/auth";
import {
  resetTimeToResubmit,
  setCode,
  setPhoneNumberVerificationStatus,
  setTimeToResubmit,
  setToken,
} from "../../redux/slices/login";

import { Button, TextField } from "@mui/material";

import { getRemainingTime } from "../../utils";

export const PhoneVerification = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [sendCode] = useSendCodeMutation();

  const [phoneNumberVerification, { isLoading }] =
    usePhoneNumberVerificationMutation();

  const {
    timeToResubmit,
    code,
    phoneNumberVerificationStatus,
    errorMessage,
    phoneNumber,
    token,
  } = auth;

  const isError = phoneNumberVerificationStatus === "error";

  useEffect(() => {
    const timerId =
      timeToResubmit > 0 &&
      setInterval(() => {
        dispatch(setTimeToResubmit());
      }, 1000);

    return () => clearInterval(timerId);
  }, [timeToResubmit]);

  const handlePhoneNumberVerification = async () => {
    await phoneNumberVerification({ token, code }).unwrap();
    dispatch(setPhoneNumberVerificationStatus("success"));
  };

  useEffect(() => {
    if (code.length === 6) {
      handlePhoneNumberVerification();
    }
  }, [code.length]);

  const onInputChange = (event) => {
    const { value } = event.currentTarget;

    if (!isNaN(value)) {
      dispatch(setCode(value));
    }
  };

  const onResendCodeSubmit = async (event) => {
    event.preventDefault();

    dispatch(resetTimeToResubmit());
    const response = await sendCode(phoneNumber).unwrap();
    dispatch(setToken(response.token));
  };

  return (
    <div className="phoneVerification">
      <div className="phoneVerification__container">
        <h2 className="phoneVerification__title">Введите код</h2>

        <div className="notification">
          <div>Код отправлен</div>
          <div>
            На номер <span className="notification__phone">{phoneNumber}</span>
          </div>
        </div>

        <form className="phoneVerification__form" onSubmit={onResendCodeSubmit}>
          <TextField
            value={code}
            onChange={onInputChange}
            variant="outlined"
            color="secondary"
            label="Код из СМС"
            helperText={errorMessage}
            error={isError}
            disabled={isLoading}
            autoFocus
          />

          <Button
            disabled={timeToResubmit > 0 || isLoading}
            type="submit"
            variant="contained"
            color="secondary"
          >
            {isLoading ? "Заготовка для Loader" : "Получить повторно"}
          </Button>
        </form>

        <div className="time">
          {timeToResubmit > 0 &&
            `Повторная отправка доступна через ${getRemainingTime(
              timeToResubmit
            )}`}
        </div>
      </div>
    </div>
  );
};
