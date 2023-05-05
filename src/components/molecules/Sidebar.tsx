import React from 'react'

import { Link } from 'react-router-dom';
import { User, Eye, Users, Settings, LogOut, Home, Map } from 'react-feather'
import Button from '../atoms/Button';
function Sidebar() {

    return (
        <div className="bg-white rounded-lg shadow-xl transform h-screen">
            <h1 className='pt-5 text-3xl px-14 font-bold'>Logo</h1>
            <div className='p-10'>
                <div className="flex flex-col justify-between items-center h-full">
                    <nav className="text-sm">
                        <div className="flex flex-col gap-8">

                            <Link to="/" className="text-sm font-bold">
                                <Button>Dashboard</Button>
                            </Link>
                            <Link to="/profile" className="hover:text-blue-900 flex">

                                <User />
                                <p className='pl-4 pt-1'>Profile</p>
                            </Link>
                            <Link to="/requests" className="hover:text-blue-900 flex">
                                <Eye />
                                <p className='pl-4 pt-1 truncate'>View requests</p>
                            </Link>
                            <Link to="/hotels" className="hover:text-blue-900 flex">
                                <Map />
                                <p className='pl-4 pt-1'>Hotels</p>
                            </Link>
                            <Link to="/rooms" className="hover:text-blue-900 flex">
                                <Home />
                                <p className='pl-4 pt-1'> Rooms</p>
                            </Link>
                            <Link to="/users" className="hover:text-blue-900 flex">
                                <Users />
                                <p className='pl-4 pt-1'>Users</p>
                            </Link>
                            <Link to="/settings" className="hover:text-blue-900 flex">
                                <Settings />
                                <p className='pl-4 pt-1'>Settings</p>
                            </Link>

                            <Link to="/home" className="font-bold text-red-600 hover:text-red-900 flex">
                                <LogOut />
                                <p className='pl-4 pt-1'>Logout</p>
                            </Link>
                        </div>
                    </nav>
                    {/* <div className="flex items-end">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                            Logout
                        </button>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Sidebar