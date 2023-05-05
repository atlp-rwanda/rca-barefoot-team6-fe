import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { User, Eye, Users, Settings, LogOut, Home, Map } from 'react-feather'
import Button from '../atoms/Button';
import { toast } from 'react-hot-toast';
import authStore from '../../store/auth.store';
import Cookies from 'js-cookie';
import cookies from '../../utils/cookies';
function Sidebar() {
    const token = Cookies.get('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const navigate = useNavigate();

    const handleLogout = async () => {
        const toastId = toast.loading('Updating...');
        try {
            await authStore.logout(config);
            toast.success('You have been logged out!', { id: toastId });
            cookies.eraseCookie('token');
            console.log("Get Token ", Cookies.get("token"));
            navigate('/');
        } catch (error) {
            toast.error(
                // @ts-ignore
                Array.isArray(error?.response?.data) ? error?.response?.data?.error[0] : error?.response?.data?.error
                    || 'Failed to update role', { id: toastId, }
            )
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-xl transform h-screen">
            <h1 className='pt-5 text-3xl px-14 font-bold'>Logo</h1>
            <div className='p-10'>
                <div className="flex flex-col justify-between items-center h-full">
                    <nav className="text-sm">
                        <div className="flex flex-col gap-8">

                            <Link to="/dashboard" className="text-sm font-bold">
                                <Button>Dashboard</Button>
                            </Link>
                            <Link to="/dashboard" className="hover:text-blue-900 flex">

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

                            <div onClick={() => handleLogout()} className="font-bold cursor-pointer text-red-600 hover:text-red-900 flex">
                                <LogOut />
                                <p className='pl-4 pt-1'>Logout</p>
                            </div>
                        </div>
                    </nav>

                </div>
            </div>
        </div>
    )
}

export default Sidebar