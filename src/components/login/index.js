import React from "react"
import { Authenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Dashboard from "../dashboard"
export default function Login()
{

    return (
        <section className="min-h-full">
            <Authenticator>
                <Dashboard/>
            </Authenticator>
        </section>
    )
}