import React, {useEffect} from "react"
import {Button, TextField} from "@mui/material"
import {getCurrentTime} from "../../utils"
import {useDispatch, useSelector} from "react-redux"
import {resetTimeToResubmit, setCode, setTimeToResubmit} from "../../redux/auth/slice"
import {EMPTY_STRING} from "../../const"
import "./phoneVerification.scss"

const NON_DIGIT = "/[^\d]/g"

export const PhoneVerification = () => {

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  
  const {timeToResubmit, code, phoneNumberVerificationStatus, errorMessage} = auth
  const isError = phoneNumberVerificationStatus === "error"

  useEffect(() => {
    const timerId = timeToResubmit > 0 && setInterval(() => {
      dispatch(setTimeToResubmit())
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeToResubmit])

  const onInputChange = (event) => {
    const {value} = event.currentTarget
    const integerValue = parseInt(value.toString().replace(NON_DIGIT, EMPTY_STRING))

    if (!isNaN(integerValue)) {
      dispatch(setCode(integerValue))
    }
  }

  const onResetTimeToResubmitClick = () => dispatch(resetTimeToResubmit())

  return (
    <div className="phoneVerification">
      <div className="phoneVerification__container">
        <h2 className="phoneVerification__title">Введите код</h2>

        <div className="notification">
          <div>Код отправлен</div>
          <div>На номер <span className="notification__phone">+7 999 999-99-99</span>
          </div>
        </div>

        <form className="phoneVerification__form">
          <TextField
            value={code}
            onChange={onInputChange}
            variant="outlined"
            color="secondary"
            label="Код из СМС"
            helperText={errorMessage}
            error={isError}
            autoFocus
            required
          />
          <Button
            disabled={timeToResubmit > 0}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onResetTimeToResubmitClick}
          >
            Получить повторно
          </Button>
        </form>

        <div className="time">
          {timeToResubmit > 0 && `Повторная отправка доступна через ${getCurrentTime(timeToResubmit)}`}
        </div>
      </div>
    </div>
  )
}
