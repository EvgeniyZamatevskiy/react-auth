import React from "react"
import {Button} from "@mui/material"
import MuiPhoneNumber from "material-ui-phone-number"
import "./auth.scss"

export const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Войти в профиль</h2>

        <form className="auth__form">
          <MuiPhoneNumber
            defaultCountry="ru"
            variant="outlined"
            color="secondary"
            label="Контактный телефон"
            id="tel"
            required
            autoFocus
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary">
            Получить код
          </Button>
        </form>

      </div>
    </div>
  )
}
