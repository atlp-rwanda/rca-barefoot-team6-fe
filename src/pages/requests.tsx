import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { requestStore } from '../store/request.store';
import { requestService } from '../services/request.service';
import { useQuery } from 'react-query';
import Pagination from '../components/dashboard/Pagination';
import { RequestInfo, RequestStatuses } from '../types/services/request.types';
import Button from '../components/atoms/Button';
import AddRequest from '../components/dashboard/AddRequest';

function ManageRequests() {
    const PAGE_LIMIT = 5; // number of items per page
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const { mutate: approveMutate, isLoading: approveLoading } = requestStore.approveRequest();
    const { mutate: rejectMutate, isLoading: rejectLoading } = requestStore.rejectRequest();

    const { data, isLoading: dataLoading, refetch, isRefetching: dataIsRefetching } = useQuery<{ data: RequestInfo[] }>('requests', async () => {
        const response = await requestService.getAllRequests();
        setPageCount(Math.ceil(response.data.data.length / PAGE_LIMIT));
        return response.data
    });
    const offset = currentPage * PAGE_LIMIT;
    const currentData = Array.isArray(data?.data) ? data?.data.slice(offset, offset + PAGE_LIMIT) : [];

    const handleApprove = (id: number) => {
        alert(id)
        approveMutate(id);
        toast.success(`Request with an id of ${id} is now approved!`)
        refetch();
    }

    const handleReject = (id: number) => {
        alert(id)
        rejectMutate(id);
        toast.success(`Request with an id of ${id} rejected.`)
        refetch();
    }
    const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
        setCurrentPage(selectedPage);
    };
    const [showCard, setShowCard] = useState(false);
    const handleEditClose = () => {
        setShowCard(false);
    };
    const handleAddClick = () => {
        setShowCard(true);
    }

    return (
        <div className={`${showCard ? 'bg-[#00000011]' : 'bg-white'} text-gray-700 p-8 rounded-lg text-sm`}>
            <div className='flex justify-between'>
                <h1>Requests</h1>
                <Button onClick={handleAddClick} className='justify-self-center mx-32 mb-2'>New Reqest</Button>
            </div>
            {showCard && (
                <AddRequest
                    refetch={refetch}
                    onClose={handleEditClose} />
            )}
            {(dataLoading || dataIsRefetching) ? <div>Loading...</div> :
                <div>
                    <div className='grid grid-cols-8 gap-4 py-3 font-bold'>
                        <h4>User Names</h4>
                        <h4>Room Name</h4>
                        <h4>Check In Date</h4>
                        <h4>Check Out Date</h4>
                        <h4>Created At</h4>
                        <h4>Status</h4>
                        <div className='mx-4'>
                            <h4>Actions</h4>
                        </div>
                    </div>
                    {currentData && currentData.map((req: RequestInfo, index: number) => {
                        const fullName = `${req.User.firstName} ${req.User.lastName}`;
                        return (
                            <div className='grid grid-cols-8 py-3 gap-4' key={index}>
                                <p>{fullName}</p>
                                <p>{req.Room.name}</p>
                                <p className='truncate text-xs'>{req.checkIn}</p>
                                <p className='truncate text-xs'>{req.checkOut}</p>
                                <p className='truncate text-xs'>{req.createdAt}</p>
                                <p className={`${req.status == RequestStatuses.REJECTED || req.status == RequestStatuses.CANCELLED ? 'text-[#FF1111]' : 'text-[#3C4DE9]'} 
                                ${req.status == RequestStatuses.APPROVED && 'text-green-600'} lowercase`}>{req.status}</p>
                                <Button className='mx-4' disabled={dataIsRefetching || req.status !== RequestStatuses.PENDING} onClick={() => handleApprove(req.id)}>Approve</Button>
                                <Button disabled={dataIsRefetching || req.status !== RequestStatuses.PENDING} onClick={() => handleReject(req.id)} className='mx-4'>Reject</Button>
                            </div>
                        );
                    })}
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </div>
            }
        </div>
    )
}



export default ManageRequests