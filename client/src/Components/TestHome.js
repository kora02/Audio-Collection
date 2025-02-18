import React from 'react'
import { useCookies } from "react-cookie";

const TestHome = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Username', 'AuthToken']);

  const signOut = () => {
    console.log("HEEEEELLLLLOOOO");
    removeCookie("Username", { path : '/' });
    removeCookie("AuthToken", { path : '/'});
    window.location.href = '/'
  };

  return (
    <div>
      TEST HOME PAGE
      <button onClick={signOut}>OOOOOOOOOO</button>
    </div>
  )
}

export default TestHome
