import React from "react"
import {Auth, PhoneVerification} from "./components"
import {useSelector} from "react-redux"

export const App = () => {

  const authStatus = useSelector(state => state.auth.authStatus)

  return (
    <div className="App">
      {authStatus === "auth" ? <Auth/> : <PhoneVerification/>}
    </div>
  )
}
