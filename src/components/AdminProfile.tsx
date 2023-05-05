import React, { useState } from 'react'

import Button from './atoms/Button'
import { authService } from '../services/auth.service';
import { useQuery } from 'react-query';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather'
import { CreateUser, EditRoleType, UserInfo } from '../types/services/user.types';
import ReactPaginate from 'react-paginate';
import clsx from 'clsx';
import EditRole from './EditRole';
import ViewProfile from './ViewProfile';


function AdminProfile() {
    const [showProfile, setShowProfile] = useState(false);

    const handleClick = () => {
        setShowProfile(true);
    };
    const handleReturn = () => {
        setShowProfile(false);
    };
    const PAGE_LIMIT = 6; // number of items per page
    const [showEdit, setShowEdit] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const { data } = useQuery<UserInfo[]>('viewUsers', async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await authService.viewUsers(config);
        setPageCount(Math.ceil(response.data.length / PAGE_LIMIT));
        return response.data;
    });

    const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * PAGE_LIMIT;
    const currentData = data ? data.slice(offset, offset + PAGE_LIMIT) : [];
    // Setting form values for update user role
    const [roleData, setRoleData] = useState<EditRoleType>({
        id: 0,
        role: ""
    })
    const handleEditRoleClick = (user: UserInfo) => {
        setRoleData({
            id: user.id,
            role: user.role
        });
        setShowEdit(true);
    };
    const handleEditClose = () => {
        setShowEdit(false);
    };
    return (
        <>
            <div className={`${showEdit ? 'bg-[#00000011]' : 'bg-white'} ${showProfile && 'hidden'} px-16 pt-8 text-sm`}>
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
                    <Button onClick={() => handleClick()}>View Profile</Button>
                </div>
                <div className='grid grid-cols-6 py-4 font-bold pt-16'>
                    <h4>First Name</h4>
                    <h4>Last Name</h4>
                    <h4>Role</h4>
                    <h4>Email</h4>
                    <h4 className='mx-8'>Actions</h4>
                </div>
                {currentData && currentData.map((user: UserInfo, index: number) => (
                    <div className='grid grid-cols-6 py-2 gap-2' key={index}>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                        <p>{user.role}</p>
                        <p>{user.email}</p>
                        <Button onClick={() => handleEditRoleClick(user)} className='bg-[#6487FE] mx-8 text-white'>Edit Role</Button>
                        {showEdit && <EditRole
                            id={user.id}
                            role={user.status}
                            formData={roleData}
                            setFormData={setRoleData}
                            onClose={handleEditClose} />}
                    </div>
                ))}
                {/* Render the pagination component */}
                <ReactPaginate
                    pageCount={pageCount}
                    className='flex gap-5 justify-center pr-32 text-md py-4 items-end bg-[#00000011]'
                    pageClassName={clsx('page-link', 'bg-white', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-100')}
                    activeClassName={'active text-blue-400 font-bold'}
                    previousClassName={'page-link'}
                    nextClassName={'page-link'}
                    breakClassName={'page-link'}
                    onPageChange={handlePageClick}
                    disabledClassName={'disabled'}
                    pageRangeDisplayed={5}
                    previousLabel={<ArrowLeftCircle />}
                    nextLabel={<ArrowRightCircle />}
                    containerClassName={'pagination'}
                />
            </div>
            {showProfile && <ViewProfile onReturn={handleReturn} />}
        </>

    )
}

export default AdminProfile