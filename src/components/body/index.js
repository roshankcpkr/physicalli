import React from 'react'
import { NavLink } from 'react-router-dom'
import * as ROUTES from "../../constants/routes"
import SearchBar from '../searchbar'
import Aos from 'aos'
import "aos/dist/aos.css"

export default function Body()
{
    return(
        <main className='h-full'>
        <div className='w-full border-b py-32 h-3/4 flex align-items'>
        <div className='flex container flex-col md:flex-row max-w-4xl mx-auto h-full items-center align-items'>
            <div className='min-h-full md:m-0 mb-8 md:mb-0 mt-4 w-3/4 md:w-1/2'>
            <h2 className='mb-4 text-4xl font-bold'>Want to hire worker for your physical task?</h2>
            <p className='text-xl text-gray-700 mt-8 mb-4'>Why not try Physicalli? Get technician at your place easily.</p>
            <NavLink to={ROUTES.LOGIN}>
                <button className='rounded-lg text-white font-semibold py-2 px-4 mt-4 text-lg transition ease-in-out delay-150 bg-gray-700 hover:scale-110 hover:bg-gray-800 duration-300'>Get Started</button>
            </NavLink>
            </div>
            <div className='ml-4 w-3/4 md:w-1/2'>
                <img src="physicalli-connect.webp" alt="easy-work"/>
            </div>
        </div>
        </div>
        <div className='flex flex-col border-b container max-w-7xl mx-auto align-items items-center py-8'>
            <h2 className='font-semibold text-3xl mx-auto mt-8'>What does physicalli do?</h2>
            <p className=' mt-8 mb-4 w-2/3 text-gray-600 text-xl'>Physicalli is a platform to hire technicians for your physically demanding jobs. Did your bike get broken on the way? Want to 
                fix your broken tv but don't
                know where to find technician? Looking for physically demanding jobs? Let physicalli solve them for you.</p>
            <div className='grid md:grid-cols-3 col-auto auto-rows-auto p-16 '>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./technician.webp" alt="connect with technician" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Connects you with technician</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Need to get connected with technician?</span> Get the contact details of the professionals.</p>
                </div>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./find.webp" alt="recommendation" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Search for Professional</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Find local professionals as per your need.
                    </span> Choose location and search the person you need.</p>
                </div>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./connected.png" alt="recommendation" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Find job as per your skill</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Have verified skill?</span> Find job as per your skill available on your locality.</p>
                </div>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./signup.png" alt="recommendation" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Just signup and start</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Create account and get set go</span> 
                    Just signup and you are ready to go.
                    </p>
                </div>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./besthire.png" alt="hiring" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Find the best</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Review skills set and experience of the workers.
                    </span>
                    Find the best candidate for your need.</p>
                </div>
                <div className='flex flex-col m-2 hover:shadow-2xl items-center text-center align-items p-8'>
                    <img src="./recommend.png" alt="recommendation" className=' w-20'/>
                    <p className='font-semibold text-base  m-2'>Recommendation system</p>
                    <p className='text-gray-600 text-sm '><span className='text-gray-600 font-semibold'>Let the recommendation system work for you.</span> Find job 
                    as per your skill and 
                    technician as per your need</p>
                </div>
            </div>
            
        </div>
        <div className='flex container flex-col md:flex-row rounded max-w-6xl mx-auto align-items bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 to-blue-900 mt-16 mb-16'>
            <img src="./postjob.png" alt="post job" className='md:w-2/4 w-full h-full'/>
            <div className='flex flex-col ml-4 w-full md:w-2/4 p-8'>
            <h2 className='text-white text-2xl font-semibold m-2'>Post your Job</h2>
            <p className='text-gray-50 text-sm '>Physicalli help you to find
            suitable worker for you job more faster. You can choose you location, add
            description about your job and post it, then wait for
            professionals to get back to you.
            </p>
            <NavLink to={ROUTES.POST_JOB}>
            <button className='rounded-lg text-black font-semibold py-2 px-4 mt-4 border-white lg:border-2  text-lg transition ease-in-out delay-150 bg-white hover:border-white hover:bg-blue-700 hover:text-white duration-300'>Post Job</button>
            </NavLink>
            </div>
        </div>
        <div className='flex container flex-col md:flex-row rounded max-w-6xl mx-auto align-items bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 to-blue-900 mt-16 mb-16'>
            <img src="./findjob.png" alt="post job" className='md:w-2/4 w-full h-full'/>
            <div className='flex flex-col ml-4 w-full md:w-2/4 p-8'>
            <h2 className='text-white text-2xl font-semibold m-2'>Looking for job?</h2>
            <p className='text-gray-50 text-sm '>Are your certified professional? Do you
            have working experience? Start finding jobs in your locality 
            that are suitable for you.
            </p>
            <NavLink to={ROUTES.FIND_JOB}>
            <button className='rounded-lg text-black font-semibold py-2 px-4 mt-4 border-white lg:border-2  text-lg transition ease-in-out delay-150 bg-white hover:border-white hover:bg-blue-700 hover:text-white duration-300'>Find Job</button>
            </NavLink>
            </div>
        </div>
        </main>

    )
}
