import React, { useState } from "react";
import LoginContext from './loginContext'

const LoginState=(props)=>{
    let details=null;
    // localStorage.removeItem('user')
    const [loginState,setLoginState]=useState(JSON.parse(localStorage.getItem('user')));
    return (
        <LoginContext.Provider value={{loginState,setLoginState}}>
            {props.children}
        </LoginContext.Provider>
    )
}
export default LoginState;