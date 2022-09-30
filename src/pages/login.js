import React from "react"
import { Login, Header, Footer } from "../components"

export default function LoginForm()
{
    return(
    <div className="flex flex-col min-h-screen">
    <Header 
        showLogin={false}
    />
    <Login/>
    <Footer/>
    </div>
    )
}