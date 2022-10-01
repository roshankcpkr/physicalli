import { Authenticator} from '@aws-amplify/ui-react'
import { JobContext, JobProvider } from '../context/jobs.js'
import React, {useContext, useEffect, useState} from 'react'
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
    console.log("i am jobs", jobs)
    return (
      <section>
    {jobs ? jobs.map(({image, id, title, description, contact, location}) =>(
      <div key={id} className="max-w-sm rounded-xl shadow-xl mx-auto m-4 mb-8">
              <div>
                <img src={image} alt={title} className="w-full"/>
              </div>
              <div className='p-4'>
              <p className='text-center font-bold text-2xl'>Title: {title}</p>
              <p className='text-lg font-semibold text-center m-2'>Description: {description}</p>
              <p className='text-lg font-semibold text-center m-2'>Contact: {contact}</p>
              <p className='text-lg font-semibold text-center m-2'>Address: {location}</p>
              </div>
                
              
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
       <JobsPage />       
    </JobProvider>
  </Authenticator>
  </>
);
}