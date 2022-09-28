import React from "react";

import { useSelector } from "react-redux";

import { Auth, PhoneVerification } from "./components";

export const App = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);

  return (
    <div className="App">
      {authStatus === "auth" ? <Auth /> : <PhoneVerification />}
    </div>
  );
};
