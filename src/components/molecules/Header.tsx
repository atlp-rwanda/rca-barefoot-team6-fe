import React from 'react';
import { Search } from 'react-feather';
import Input from '../atoms/Input';
import { authService } from '../../services/auth.service';
import { useQuery } from 'react-query';
import cookies from '../../utils/cookies';
import Cookies from 'js-cookie';

function Header() {
    const { data } = useQuery('viewProfile', async () => {
        const token = Cookies.get('token');
        // const token = cookies.getCookie("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await authService.viewProfile(config);

        return response.data;
    });
    console.log("data: ", data?.firstName);

    return (
        <div className="text-sm bg-white border-b border-gray-200 py-3 px-8 items-center grid grid-flow-col-dense">
            <h1 className="text-2xl font-bold leading-tight text-gray-900">Dashboard</h1>
            <div className='flex border rounded-md'>
                <Search className='mt-1.5 ml-2' color='black' size={20} />
                <Input placeholder='Search by any keyword or specific attribute'
                    type='text' name='search' className='border-0' />
            </div>
            <div className='flex justify-end'>
                <img src="/notifications.svg" alt="Notifications" />
            </div>
            <div>
                <div className='flex justify-end'>
                    <p className='font-bold'>{data?.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : 'Loading...'}</p>
                </div>
                <div className='flex justify-end'>
                    <p className='font-bold'>{data?.email ? `${data.email}` : 'Loading...'}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;