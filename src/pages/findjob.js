import { Authenticator} from '@aws-amplify/ui-react'
import { JobContext, JobProvider } from '../context/jobs.js'
import React, {useContext, useEffect, useState} from 'react'
import { Header } from '../components/index.js'
import { Auth } from 'aws-amplify'
import SearchBar from '../components/searchbar/index.js'

export default function FindJob() {
  
  let [userEmail, setuserEmail] =  useState("")
  useEffect(
     function ()
     {
            Auth.currentAuthenticatedUser().then(user => {
              setuserEmail(user.attributes.email)
          })
     }, [])
  const JobsPage = ()=>
  {

    const {jobs} = useContext(JobContext)
    return (
      <section className='flex flex-col items-center align-items w-full bg-black min-h-screen'>
        <SearchBar jobs={jobs} />

   </section>
    )
}
return (
  <>
  <Header 
            showDashboard={true}
            showLogin={userEmail ? false: true}
            showSignout={userEmail ? true: false}
  />
  <Authenticator>
   <JobProvider>
       <JobsPage />       
    </JobProvider>
  </Authenticator>
  </>
);
}