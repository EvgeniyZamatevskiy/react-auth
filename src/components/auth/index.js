import React, { useEffect } from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthStatus,
  setCountryCode,
  setPhoneNumber,
  setSMSCodeToken,
} from "../../redux/slices/login";
import { useSendCodeMutation } from "../../redux/api/auth";

import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";
import "react-phone-input-2/lib/material.css";

import { LoadingButton } from "@mui/lab";

import parsePhoneNumber from "libphonenumber-js";

const isValidNumber = (inputNumber, countryCode) => {
  if (!inputNumber) return;

  return parsePhoneNumber(inputNumber, countryCode).isValid();
};

export const Auth = () => {
  const { phoneNumber, countryCode } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [sendCode, { data: sendCodeData, isLoading: isSendCodeLoading }] =
    useSendCodeMutation();

  useEffect(() => {
    if (!sendCodeData) return;

    dispatch(setSMSCodeToken(sendCodeData.token));
    dispatch(setAuthStatus("enterCode"));
  }, [sendCodeData]);

  const onPhoneNumberChange = (value, country) => {
    if (countryCode !== country.countryCode) {
      dispatch(setCountryCode(country.countryCode));
    }

    dispatch(setPhoneNumber(value));
  };

  const onInputKeyPressHandler = ({ key }) => {
    if (key !== "Enter") return;
    if (!isValidNumber(phoneNumber, countryCode)) return;

    sendCode(phoneNumber);
  };

  const onButtonClickHandler = () => {
    if (!isValidNumber(phoneNumber, countryCode)) return;

    sendCode(phoneNumber);
  };

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

          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            loading={isSendCodeLoading}
            onClick={onButtonClickHandler}
          >
            Получить код
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};
