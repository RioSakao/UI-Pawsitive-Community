'use client'
import Header from "./header-login"
import Login from "./login-util"

export default function LoginPage(){
    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
            
        </>
    )
}