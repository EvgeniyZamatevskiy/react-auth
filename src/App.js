import React from 'react'
import { PhoneVerification } from './components/phoneVerification/PhoneVerification'
import { Auth } from './components/auth/Auth'

export const App = () => {
  return (
    <div className='App'>
      <Auth />
      {/* <PhoneVerification /> */}
    </div>
  )
}
