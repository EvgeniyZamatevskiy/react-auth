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
  decreaseTimeToResubmit,
  setSMSCodeToken,
  setErrorMessage,
} from "../../redux/slices/login";

import { Button, TextField } from "@mui/material";

import { getRemainingTime } from "../../utils";

export const PhoneVerification = () => {
  const {
    timeToResubmit,
    code,
    phoneNumberVerificationStatus,
    errorMessage,
    phoneNumber,
    SMSCodeToken,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [sendCode, { data: sendCodeData, isLoading: isSendCodeLoading }] =
    useSendCodeMutation();

  const [
    phoneNumberVerification,
    {
      data: phoneNumberVerificationData,
      isLoading: isPhoneNumberVerificationLoading,
      error: phoneNumberVerificationError,
    },
  ] = usePhoneNumberVerificationMutation();

  useEffect(() => {
    if (!sendCodeData) return;

    dispatch(setSMSCodeToken(sendCodeData.token));
  }, [sendCodeData]);

  useEffect(() => {
    if (timeToResubmit === 0) return;

    const timerId = setInterval(() => dispatch(decreaseTimeToResubmit()), 1000);

    return () => clearInterval(timerId);
  }, [timeToResubmit]);

  useEffect(() => {
    if (!phoneNumberVerificationData) return;

    console.log(phoneNumberVerificationData);

    dispatch(setPhoneNumberVerificationStatus("success"));
  }, [phoneNumberVerificationData]);

  useEffect(() => {
    if (!phoneNumberVerificationError) return;

    dispatch(setErrorMessage("Неверный код"));
  }, [phoneNumberVerificationError]);

  const isError = phoneNumberVerificationStatus === "error";

  useEffect(() => {
    if (code.length === 6) {
      phoneNumberVerification({ token: SMSCodeToken, code });
    }
  }, [code.length]);

  const onInputChange = (e) => {
    const value = e.target.value;

    if (!Number.isInteger(Number(value))) return;

    dispatch(setCode(value));
  };

  const onButtonClickHandler = () => {
    dispatch(resetTimeToResubmit());

    sendCode(phoneNumber);
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

        <div className="phoneVerification__form">
          <TextField
            value={code}
            onChange={onInputChange}
            variant="outlined"
            color="secondary"
            label="Код из СМС"
            helperText={errorMessage}
            error={!!errorMessage}
            disabled={isPhoneNumberVerificationLoading || isSendCodeLoading}
            autoFocus
            inputProps={{ maxLength: 6 }}
          />

          <Button
            disabled={
              timeToResubmit > 0 ||
              isPhoneNumberVerificationLoading ||
              isSendCodeLoading
            }
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onButtonClickHandler}
          >
            {isPhoneNumberVerificationLoading || isSendCodeLoading
              ? "Заготовка для Loader"
              : "Получить повторно"}
          </Button>
        </div>

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
