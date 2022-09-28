import React, { useEffect } from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthStatus,
  setPhoneNumber,
  setSMSCodeToken,
} from "../../redux/slices/login";
import { useSendCodeMutation } from "../../redux/api/auth";

import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";
import "react-phone-input-2/lib/material.css";

import { Button } from "@mui/material";

export const Auth = () => {
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const dispatch = useDispatch();

  const [sendCode, { data: sendCodeData, isLoading: isSendCodeLoading }] =
    useSendCodeMutation();

  useEffect(() => {
    if (!sendCodeData) return;

    dispatch(setSMSCodeToken(sendCodeData.token));
    dispatch(setAuthStatus("enterCode"));
  }, [sendCodeData]);

  const onPhoneNumberChange = (value) => dispatch(setPhoneNumber(value));

  const onInputKeyPressHandler = ({ key }) => {
    if (key !== "Enter") return;

    sendCode(phoneNumber);
  };

  const onButtonClickHandler = () => sendCode(phoneNumber);

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Войти в профиль</h2>

        <div className="auth__form">
          <PhoneInput
            onlyCountries={["ru", "by", "am", "kg", "ua", "kz"]}
            country="ru"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            specialLabel="Контактный телефон"
            localization={ru}
            onKeyDown={onInputKeyPressHandler}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSendCodeLoading}
            onClick={onButtonClickHandler}
          >
            {isSendCodeLoading ? "Заготовка для Loader" : "Получить код"}
          </Button>
        </div>
      </div>
    </div>
  );
};
