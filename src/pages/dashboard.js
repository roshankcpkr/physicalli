import React, { useEffect, useState } from 'react'
import Dashboard from '../components/dashboard'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Header } from '../components'
import { Auth } from 'aws-amplify'

export default function DashboardPage()
{
    let [userEmail, setuserEmail] =  useState("")
    useEffect(
       function ()
       {
              Auth.currentAuthenticatedUser().then(user => {
                setuserEmail(user.attributes.email)
            })
       }, [])
    return(
        <>
            <Header 
                 showDashboard={true}
                 showLogin={userEmail ? false: true}
                 showSignout={userEmail ? true: false}
            />
            <Authenticator>
               <Dashboard />
            
            </Authenticator>
        </>
    )
}