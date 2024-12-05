import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'


export default function Layout() {
    return (
        <div className='flex flex-row justify-between bg-customDark2 h-screen w-screen'>
            <Sidebar />
            <div className='flex-1 h-full'>
                {<Outlet />}
            </div>
        </div>
    )
}
