import React, {useEffect} from "react"
import {Button, TextField} from "@mui/material"
import {getCurrentTime} from "../../utils"
import {useDispatch, useSelector} from "react-redux"
import {EMPTY_STRING} from "../../const"
import {usePhoneNumberVerificationMutation, useSendCodeMutation} from "../../services/CodeService"
import {
  resetTimeToResubmit,
  setCode,
  setErrorMessage,
  setPhoneNumberVerificationStatus,
  setTimeToResubmit
} from "../../redux/auth/slice"
import "./phoneVerification.scss"

const NON_DIGIT = "/[^\d]/g"

export const PhoneVerification = () => {

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  const [sendCode] = useSendCodeMutation()
  const [phoneNumberVerification, {isLoading}] = usePhoneNumberVerificationMutation()

  const {timeToResubmit, code, phoneNumberVerificationStatus, errorMessage, phoneNumber, token} = auth
  const isError = phoneNumberVerificationStatus === "error"
  const codeLength = code.toString().split(EMPTY_STRING).length

  useEffect(() => {
    const timerId = timeToResubmit > 0 && setInterval(() => {
      dispatch(setTimeToResubmit())
    }, 1000)

    return () => clearInterval(timerId)
  }, [timeToResubmit])

  const handlePhoneNumberVerification = async () => {
    await phoneNumberVerification({token, code})
  }

  useEffect(() => {
    if (codeLength === 6) {
      handlePhoneNumberVerification()
    }
  }, [codeLength])

  const resetErrorMessage = () => {
    if (errorMessage && phoneNumberVerificationStatus === "error") {
      dispatch(setErrorMessage(EMPTY_STRING))
      dispatch(setPhoneNumberVerificationStatus("idle"))
    }
  }

  const onInputChange = (event) => {
    resetErrorMessage()

    const {value} = event.currentTarget
    const integerValue = parseInt(value.toString().replace(NON_DIGIT, EMPTY_STRING))

    dispatch(setCode(integerValue))
  }

  const onResendCodeSubmit = async (event) => {
    event.preventDefault()

    resetErrorMessage()
    dispatch(resetTimeToResubmit())
    await sendCode(phoneNumber)
  }

  return (
    <div className="phoneVerification">
      <div className="phoneVerification__container">
        <h2 className="phoneVerification__title">Введите код</h2>

        <div className="notification">
          <div>Код отправлен</div>
          <div>На номер <span className="notification__phone">{phoneNumber}</span>
          </div>
        </div>

        <form className="phoneVerification__form" onSubmit={onResendCodeSubmit}>
          <TextField
            value={code || EMPTY_STRING}
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
            disabled={timeToResubmit > 0 || isLoading}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onResetTimeToResubmitClick}
          >
            {isLoading ? "Заготовка для Loader" : "Получить повторно"}
          </Button>
        </form>

        <div className="time">
          {timeToResubmit > 0 && `Повторная отправка доступна через ${getCurrentTime(timeToResubmit)}`}
        </div>
      </div>
    </div>
  )
}
