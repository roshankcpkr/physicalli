import { Auth } from 'aws-amplify'
import React from 'react'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

export default function Header(props)
{
    const {showLogin, showSignout, showDashboard} = props
    return (
        <header className="h-16  py-10 sticky top-0 drop-shadow shadow-blue-600 border-b mb-8 bg-gradient-to-r from-black via-gray-600 to-gray-800">
        <div className="container mx-auto max-width-lg h-full">
            <div className="flex justify-between h-full align-items">
                <div className="text-gray-700 flex items-center align-items cursor-pointer">
                    <h1 className="font-semibold tracking-wide subpixel-antialiased font-serif text-2xl text-white">
                       <NavLink to={ROUTES.HOME}>Physicalli</NavLink>
                    </h1> 
                </div>
                <div className='text-white flex items-center align-items cursor-pointer'>
                <NavLink to={ROUTES.POST_JOB} className="mr-2 rounded hover:brightness-75">
                    <button
                        type="button"
                        className="font-medium text-sm rounded text-white-500 w-20 h-8 text-lg"
                    >
                        Post job
                    </button>
                </NavLink>
                <NavLink to={ROUTES.FIND_JOB} className="mr-2 bg-green-600 rounded hover:brightness-75">
                    <button
                        type="button"
                        className="font-medium text-sm rounded text-white-500 w-20 h-8 text-lg"
                    >
                        Find job
                    </button>
                </NavLink>
                {showLogin ? <NavLink to={ROUTES.LOGIN} className="mr-2 border rounded border-gray-500 hover:brightness-75">
                    <button
                        type="button"
                        className="font-medium text-sm rounded text-white w-20 h-8 text-lg"
                    >
                        Login
                    </button>
                </NavLink>: ""}
                {showDashboard ? <NavLink to={ROUTES.DASHBOARD} className="mr-2 border rounded border-gray-500 hover:brightness-75">
                    <button
                        type="button"
                        className="font-medium text-sm rounded text-black bg-white w-20 h-8 text-lg"
                    >
                        Dashboard
                    </button>
                </NavLink>: ""}
                {
                    showSignout ? 
                     <button onClick={
                        async function signOut() {
                            try {
                                await Auth.signOut();
                            } catch (error) {
                                console.log('error signing out: ', error);
                            }
                        }
                    }
                    className="mr-2 border rounded border-gray-500 hover:brightness-75 font-medium text-sm text-white w-20 h-8 text-lg">
                        Signout
                    </button>
                    : 
                    ""
                }
                </div>
            </div>
        </div>

    </header>
    )
}