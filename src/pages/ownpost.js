import React, { useEffect, useState, useContext } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Header, Modal } from '../components'
import { Auth, graphqlOperation } from 'aws-amplify'
import { JobContext, JobProvider } from '../context/jobs.js'
import { API } from 'aws-amplify'
import {deleteJobpost} from '../graphql/mutations'

export default function OwnPost()
{
    let [userSub, setuserSub] =  useState("")
    const {jobs} = useContext(JobContext)
    const [editJobs, setEditJobs] = useState("")
    const [openModal, setOpenModal] = useState(false)
    function myOpenModal()
    {
        setOpenModal((openModal) => !openModal)
    }
    useEffect(
       function ()
       {
              Auth.currentAuthenticatedUser().then(user => {
                setuserSub(user.attributes.sub)
                
                
            })
       }, [])
    return(
        <>
            <Header 
                 showDashboard={true}
                 showLogin={userSub ? false: true}
                 showSignout={userSub ? true: false}
            />
            <Authenticator>
                <JobProvider>
            <div className='flex flex-col items-center align-items w-full bg-black min-h-screen'>
                {jobs !== null ? jobs.map(({image, id, title, description, contact, location, owner, price}) =>( 
                owner === userSub ? (
                <div key={id} className="max-w-sm rounded-xl shadow-xl bg-white mx-auto m-4 mb-8">
                    <div>
                        <img src={image} alt={title} className="w-full"/>
                    </div>
                    <div className='p-4'>
                    <p className='text-center font-bold text-2xl'>Title: {title}</p>
                    <p className='text-lg font-semibold text-center m-2'>Description: {description}</p>
                    <p className='text-lg font-semibold text-center m-2'>Budget: {price}</p>
                    <p className='text-lg font-semibold text-center m-2'>Contact: {contact}</p>
                    <p className='text-lg font-semibold text-center m-2'>Address: {location}</p>
                    <div>
                    <button className='bg-red-500 text-white font-bold text-lg p-2 rounded-lg m-2 hover:brightness-75' onClick={async () => {
                        const deleteVariable = {
                            id: id
                          };
                        console.log(deleteVariable)
                        await API.graphql({
                            ...graphqlOperation(deleteJobpost, { input: deleteVariable}),
                            authMode: "AMAZON_COGNITO_USER_POOLS",
                          });
                          window.location.reload(false)
                    }}>Delete</button>
                    <button className='bg-blue-500 text-white font-bold text-lg p-2 rounded-lg m-2 hover:brightness-75' onClick={async ()=>{
                        setEditJobs(id)
                        myOpenModal()
                    }}>Edit</button>
                    </div>
                    </div>
                    </div>) : null
        )) : 
        null
        }
        {openModal && <Modal openModal={() => myOpenModal()} id={editJobs} jobdetails = {jobs}/>}
                </div>
                </JobProvider>
            </Authenticator>
        </>
    )
}