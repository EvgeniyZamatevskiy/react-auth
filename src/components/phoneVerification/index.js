import React, {useEffect, useState} from "react"
import {Button, TextField} from "@mui/material"
import {getCurrentTime} from "../../utils"
import "./phoneVerification.scss"

const DELAY = 1000
const NON_DIGIT = "/[^\d]/g"
const EMPTY_STRING = ""

export const PhoneVerification = () => {

  const [time, setTime] = useState(60)
  const [code, setCode] = useState(0)

  useEffect(() => {
    const timerId = time > 0 && setInterval(() => {
      setTime(prev => prev - 1)
    }, DELAY)

    return () => clearInterval(timerId)
  }, [time])

  const onInputChange = (event) => {
    const {value} = event.currentTarget
    const integerValue = parseInt(value.toString().replace(NON_DIGIT, EMPTY_STRING))

    setCode(integerValue)
  }

  const onSetInitialValueTimeClick = () => setTime(60)

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
            value={code || EMPTY_STRING}
            onChange={onInputChange}
            variant="outlined"
            color="secondary"
            label="Код из СМС"
            autoFocus
            required
          />
          <Button
            disabled={time > 0}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSetInitialValueTimeClick}
          >
            Получить повторно
          </Button>
        </form>

        <div className="time">
          {time > 0 && `Повторная отправка доступна через ${getCurrentTime(time)}`}
        </div>
      </div>
    </div>
  )
}
