import { Authenticator} from '@aws-amplify/ui-react'
import { JobContext, JobProvider } from '../context/jobs.js'
import React, {useContext, useEffect, useState} from 'react'
import { InterestProvider, InterestContext } from '../context/interested'
import { Header } from '../components/index.js'
import { Auth } from 'aws-amplify'

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
    const {addInterest} = useContext(InterestContext)
    console.log(jobs)
    return (
      <section>
    {jobs ? jobs.map(({image, id, title}) =>(
      <div key={id}>
              <div>
                <img src={image} alt={title} />
                <p>{title}</p>
              </div>
              <button onClick={()=> addInterest(id)}>Interested</button>
              
            </div>
      )) : <h2>Jobs not found</h2>}
      
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
   <InterestProvider>
       <JobsPage />
       
    </InterestProvider>
    </JobProvider>
  </Authenticator>
  </>
);
}