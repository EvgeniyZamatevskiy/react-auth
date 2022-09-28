import React from "react"
import {Button} from "@mui/material"
import MuiPhoneNumber from "material-ui-phone-number"
import {useDispatch, useSelector} from "react-redux"
import {setAuthStatus, setPhoneNumber, setToken} from "../../redux/slices/auth"
import {useSendCodeMutation} from "../../redux/api/smsAuthApi"
import "./index.scss"

export const Auth = () => {

  const dispatch = useDispatch()

  const phoneNumber = useSelector(state => state.auth.phoneNumber)

  const [sendCode, {isLoading}] = useSendCodeMutation()

  const onPhoneNumberChange = (value) => {
    dispatch(setPhoneNumber(value))
  }

  const onSendCodeSubmit = async (event) => {
    event.preventDefault()

    const payload = await sendCode(phoneNumber).unwrap()
    dispatch(setToken(payload.token))
    dispatch(setAuthStatus("enterCode"))
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Войти в профиль</h2>

        <form className="auth__form" onSubmit={onSendCodeSubmit}>
          <MuiPhoneNumber
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            defaultCountry="ru"
            variant="outlined"
            color="secondary"
            label="Контактный телефон"
            id="tel"
            required
            autoFocus
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary" disabled={isLoading}>
            {isLoading ? "Заготовка для Loader" : "Получить код"}
          </Button>
        </form>

      </div>
    </div>
  )
}
