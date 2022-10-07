import React from "react"
import { NavLink } from "react-router-dom"
import * as ROUTES from "../../constants/routes"

export default function Dashboard()
{
    return(
        
        <div>
            <div className='flex flex-col border-b container max-w-7xl mx-auto align-items items-center py-8'>
            <div className='grid grid-cols-3 p-16'>
               <NavLink to={ROUTES.FIND_JOB}>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./find.webp" alt="connect with technician" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Find Job</p>
                    <p className='text-gray-600 text-sm '>Browse available jobs</p>
                </div>
                </NavLink>
                <NavLink to={ROUTES.POST_JOB}>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./recommend.png" alt="connect with technician" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Post Job</p>
                    <p className='text-gray-600 text-sm '>Post a job</p>
                </div>
                </NavLink>
                <NavLink to={ROUTES.UPDATE_PROFILE}>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./technician.webp" alt="connect with technician" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Update your profile</p>
                    <p className='text-gray-600 text-sm '>Update your profile</p>
                </div>
               </NavLink>
               <NavLink to={ROUTES.OWN_POST}>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./postjob.png" alt="connect with technician" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Check your own post</p>
                    <p className='text-gray-600 text-sm '>Find the post done by you.</p>
                </div>
               </NavLink>
            </div>
            
        </div>
            
        </div>
    )
}