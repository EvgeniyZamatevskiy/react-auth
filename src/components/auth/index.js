import React from "react";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthStatus,
  setPhoneNumber,
  setToken,
} from "../../redux/slices/login";
import { useSendCodeMutation } from "../../redux/api/auth";

import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";
import "react-phone-input-2/lib/material.css";

import { Button } from "@mui/material";

export const Auth = () => {
  const dispatch = useDispatch();

  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const [sendCode, { isLoading }] = useSendCodeMutation();

  const onPhoneNumberChange = (value) => {
    console.log(value);

    dispatch(setPhoneNumber(value));
  };

  const onSendCodeSubmit = async (event) => {
    event.preventDefault();

    const payload = await sendCode(phoneNumber).unwrap();
    dispatch(setToken(payload.token));
    dispatch(setAuthStatus("enterCode"));
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Войти в профиль</h2>

        <form className="auth__form" onSubmit={onSendCodeSubmit}>
          <PhoneInput
            onlyCountries={["ru", "by", "am", "kg", "ua", "kz"]}
            country="ru"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            specialLabel="Контактный телефон"
            localization={ru}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Заготовка для Loader" : "Получить код"}
          </Button>
        </form>
      </div>
    </div>
  );
};
