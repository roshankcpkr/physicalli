import React from 'react'
export default function SearchBar()
{
    return (
        <div className="mr-auto max-w-max">
            <form className='flex items-center bg-white p-2 rounded'>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input placeholder="Job title, work" className='p-4 border-r outline-0	'/>
                </div>
                <div className='flex items-center ml-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <input placeholder="Location" className='p-4 outline-0	'/>
                </div>
                <button className='px-4 hover:brightness-75 py-2 rounded-lg bg-gray-900 text-white'>Search</button>
            </form>
        </div>
    )
}