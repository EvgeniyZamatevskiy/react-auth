import React from "react"
import {Button} from "@mui/material"
import MuiPhoneNumber from "material-ui-phone-number"
import {useSendCodeMutation} from "../../services/CodeService"
import {useDispatch, useSelector} from "react-redux"
import {setPhoneNumber} from "../../redux/auth/slice"
import "./auth.scss"

export const Auth = () => {

  const dispatch = useDispatch()

  const phoneNumber = useSelector(state => state.auth.phoneNumber)

  const [sendCode, {isLoading}] = useSendCodeMutation()

  const onPhoneNumberChange = (value) => {
    dispatch(setPhoneNumber(value))
  }

  const onSendCodeSubmit = async (event) => {
    event.preventDefault()

    await sendCode(phoneNumber)
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
