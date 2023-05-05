import React, { useState } from 'react'

import Users from './Users'
import Button from './atoms/Button'
import ProfileSetting from './ProfileSetting';

function AdminProfile() {
    const users = [1, 2, 3, 4, 5, 6]
    const [showCard, setShowCard] = useState(false);

    const handleClick = () => {
        console.log("Button clicked!!!");

        setShowCard(true);
    };

    const handleClose = () => {
        setShowCard(false);
    };
    return (
        <div className={`${showCard ? 'bg-gray-100' : 'bg-white'} px-16 pt-8 text-sm`}>
            <div className='flex gap-8'>
                <div className='bg-[#FAF3FF] shadow text-primary pt-2 px-4 rounded-md'>
                    <p>Registered Users</p>
                    <div className='border-l-2 mt-2 h-10 border-primary'>
                        <p className='py-2 px-8'>50</p>
                    </div>
                </div>
                <div className='bg-[#FAF3FF] shadow text-[#6487FE] pt-2 px-4 rounded-md'>
                    <p>Active Users</p>
                    <div className='border-l-2 my-2 h-10 border-[#6487FE]'>
                        <p className='py-2 px-8'>50</p>
                    </div>
                </div>
            </div>
            <div className='-mt-16 flex justify-end items-center gap-5'>
                <Button>View Profile</Button>
                <Button onClick={handleClick}>Add User</Button>
                {showCard && <ProfileSetting onClose={handleClose} />}
            </div>
            {/* </div> */}
            <div className='grid grid-cols-5 py-4 font-bold pt-16'>
                <h4>User Names</h4>
                <h4>Status</h4>
                <h4>Email</h4>
                <h4 className='pl-4'>Actions</h4>
            </div>
            {
                users.map(() => {
                    return (
                        <Users />
                    )
                })
            }
        </div>

    )
}

export default AdminProfile