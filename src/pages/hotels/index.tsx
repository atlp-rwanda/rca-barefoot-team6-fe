import { useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import { hotelService } from '../../services/hotel.service';
import { HotelInfo } from '../../types/services/hotel.types';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import NewHotel from '../../components/hotels/new';
import Modal from '../../components/atoms/Modal';
import ViewMore from '../../components/hotels/View';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import toast from 'react-hot-toast';
import DashboardLayout from '../../layout/DashboardLayout';

interface InputProps {
	setOpenModal: (value: boolean) => void;
	hotels?: HotelInfo[];
}

const TableHeader = (props: InputProps) => {
	const { setOpenModal, hotels } = props;

	return (
		<div className='flex justify-between'>
			<div className='grid grid-cols-2 gap-3'>
				<div className='bg-violet-200 px-4 py-3 rounded-lg cursor-pointer'>
					<h6 className='text-blue-600'>Total Hotels</h6>
					<div className='flex mt-3'>
						<div className='border-l-4 pr-1 border-blue-600'></div>
						<p className='text-blue-600 font-bold text-lg'>{hotels?.length}</p>
					</div>
				</div>
				<div className='bg-violet-200 px-4 py-3 rounded-lg cursor-pointer'>
					<h6 className='text-blue-600'>Active Hotels</h6>
					<div className='flex mt-3'>
						<div className='border-l-4 pr-1 border-blue-600'></div>
						<p className='text-blue-600 font-bold text-lg'>{hotels?.length}</p>
					</div>
				</div>
			</div>
			<div className='w-64'>
				<Button className='mr-8' onClick={() => setOpenModal(true)}>
					Create New Hotel
				</Button>
			</div>
		</div>
	);
};
const DisplayHotels = () => {
	const [hotels, setHotels] = useState([]);
	const [selectedHotel, setSelectedHotel] = useState({} as HotelInfo);
	const [openModal, setOpenModal] = useState(false);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [hotelToEdit, setHotelToEdit] = useState({} as HotelInfo);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [hotelToDelete, setHotelToDelete] = useState({} as HotelInfo);

	useEffect(() => {
		if (Object.keys(hotelToEdit).length > 0) {
			setOpenEditModal(true);
		}
	}, [hotelToEdit]);

	useEffect(() => {
		if (Object.keys(selectedHotel).length > 0) {
			setOpenModal(true);
		}
	}, [selectedHotel]);

	useEffect(() => {
		if (!openModal) setSelectedHotel({} as HotelInfo);
	}, [openModal]);


	useEffect(() => {
		if (!openDeleteModal) setHotelToDelete({} as HotelInfo);
	}, [openDeleteModal]);

	useEffect(() => {
		if (Object.keys(hotelToDelete).length > 0) {
			setOpenDeleteModal(true);
		}
	}, [hotelToDelete]);

	useEffect(() => {
		if (!openEditModal) setHotelToEdit({} as HotelInfo);
	}, [openEditModal]);

	async function getHotels() {
		try {
			const res: any = await hotelService.getHotels();
			setHotels(res.data.hotels);
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getHotels();
	}, []);

	const handleDeleteHotel = async () => {
		try {
			const toastId = toast.loading('deleting hotel...');
			const res = await hotelService.deleteHotel(hotelToDelete.id);
			if (res.status === 200) {
				toast.success('Hotel deleted successfully', {
					id: toastId,
				});
			}
			getHotels();
			setOpenDeleteModal(false);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<DashboardLayout>

		<div className='pt-5 px-2'>
			<TableHeader setOpenModal={setOpenCreateModal} hotels={hotels} />
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								#
							</th>

							<th scope='col' className='px-6 py-3'>
								Hotel name
							</th>
							<th scope='col' className='px-6 py-3'>
								Hotel email
							</th>
							<th scope='col' className='px-6 py-3'>
								Website
							</th>
							<th scope='col' className='px-6 py-3'>
								Address
							</th>
							<th scope='col-span-2' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{hotels.map((hotel: HotelInfo, i) => (
							<tr
								className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 drop-shadow-md py-1 rounded'
								key={i}
							>
								<td className='px-6 py-4'>{i + 1}</td>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{hotel.name}
								</th>
								<td className='px-6 py-4'>{hotel.email}</td>
								<td className='px-6 py-4'>{hotel.website}</td>
								<td className='px-6 py-4'>{hotel.address}</td>
								<td className='px-6 py-4'>
									<Button
										className='mr-2 w-50'
										onClick={() => setSelectedHotel(hotel)}
									>
										View More
									</Button>
									<Button
										className='bg-green-600/50 mr-2 w-50'
										onClick={() => setHotelToEdit(hotel)}
									>
										Edit
									</Button>
									<Button
										className='bg-red-600/50 w-50'
										onClick={() => setHotelToDelete(hotel)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Modal
				body={<ViewMore hotel={selectedHotel} />}
				isOpen={openModal}
				setIsOpen={setOpenModal}
				title='View More about'
			/>
			<Modal
				body={
					<NewHotel
						hotelId={hotelToEdit.id}
						loadData={getHotels}
						status='edit'
						setOpenModal={setOpenEditModal}
					/>
				}
				isOpen={openEditModal}
				setIsOpen={setOpenEditModal}
				title='Edit Hotel'
			/>
			<Modal
				body={
					<NewHotel loadData={getHotels} setOpenModal={setOpenCreateModal} />
				}
				isOpen={openCreateModal}
				setIsOpen={setOpenCreateModal}
				title='Create New Hotel'
			/>

			<Modal
				body={
					<DeleteConfirmation
						onCancel={() => setOpenDeleteModal(false)}
						onDelete={() => handleDeleteHotel()}
					/>
				}
				hideClose={true}
				isOpen={openDeleteModal}
				setIsOpen={setOpenDeleteModal}
				title=''
			/>
		</div>
		</DashboardLayout>
	);
};

export default DisplayHotels;
