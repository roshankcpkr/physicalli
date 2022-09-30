import { Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import {Header, Body, Footer} from '../components/'

export default function Home()
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
                 showDashboard={userEmail ? true: false}
                 showLogin={userEmail ? false: true}
                 showSignout={userEmail ? true: false}
            />
        <Body />
        <Footer />
        </>
    )
}