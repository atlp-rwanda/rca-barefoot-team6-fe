import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import { formValidate } from '../../utils/validator';
import {
	CreateHotel,
	HotelCoordinates,
} from '../../types/services/hotel.types';
import hotelStore from '../../store/hotel.store';
import { useMutation } from 'react-query';
import { hotelService } from '../../services/hotel.service';

interface Props {
	status?: string;
	hotelId?: string;
	loadData: () => void;
	setOpenModal: (boolean: boolean) => void;
}

export default function NewHotel(props: Props) {
	const { mutate, isLoading } = hotelStore.create();
	const { status, hotelId, loadData, setOpenModal } = props;

	const [dataErrors, setDataErrors] = useState<{
		touched: {
			[key: string]: boolean;
		};
		errors: {
			[key: string]: string;
		};
		hasError: boolean;
	}>({
		touched: {},
		errors: {},
		hasError: false,
	});
	const [formData, setFormData] = useState<CreateHotel>({
		name: '',
		email: '',
		province: '',
		district: '',
		sector: '',
		cell: '',
		village: '',
		website: '',
		address: '',
	});

	const [formDataCordinates, setFormDataCoordinates] =
		useState<HotelCoordinates>({
			latitude: 0,
			longitude: 0,
		});

	const getInitialData = async () => {
		if (hotelId) {
			const res = await hotelService.getHotel(hotelId);
			const hotel = res.data.hotel;
			setFormData({
				name: hotel.name,
				email: hotel.email,
				province: hotel.province,
				district: hotel.district,
				sector: hotel.sector,
				cell: hotel.cell,
				village: hotel.village,
				website: hotel.website,
				address: hotel.address,
			});
			setFormDataCoordinates({
				latitude: hotel.coordinates.latitude,
				longitude: hotel.coordinates.longitude,
			});
		}
	};

	useEffect(() => {
		if (status === 'edit') {
			getInitialData();
		}
	}, [status, hotelId]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const validateErrors = formValidate(formData);
		setDataErrors(validateErrors);
		if (validateErrors.hasError) return;

		if (status == 'edit') {
			try {
				const toastId = toast.loading('updating...');
				formData.coordinates = formDataCordinates;
				if (hotelId) {
					const res = await hotelService.updateHotel(hotelId, formData);
					toast.success('Successfully updated hotel!', {
						id: toastId,
					});
					loadData();
					setOpenModal(false);
				}
			} catch (e) {
				console.log(e);
			}

			return;
		}
		const toastId = toast.loading('creating...');
		formData.coordinates = formDataCordinates;

		mutate(formData, {
			onSuccess: (_) => {
				toast.success('New hotel was created successfully!', {
					id: toastId,
				});
				loadData();
				setOpenModal(false);
				// navigate('/hotels');
			},
			onError: (error) => {
				toast.error(
					// @ts-ignore
					error?.response?.data?.message || 'Something went wrong',
				)
			},
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		// check error
		const validateErrors = formValidate({ ...formData, [name]: value }, name);
		setDataErrors((previousErrors) => {
			return {
				...previousErrors,
				touched: {
					...previousErrors.touched,
					[name]: true,
				},
				errors: {
					...previousErrors.errors,
					[name]: validateErrors.errors[name],
				},
				hasError: validateErrors.hasError,
			};
		});

		if (name === 'latitude' || name === 'longitude') {
			setFormDataCoordinates({ ...formDataCordinates, [name]: value });
			return;
		}
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='max-w-xl px-9 py-4 mx-auto my-6'>
			<h1 className='text-3xl font-bold text-center text-primary'>
				{status === 'edit' ? 'Edit Hotel': 'Create New Hotel'}
			</h1>

			<form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 mt-5'>
				<Input
					type='email'
					placeholder='Email Address'
					name='email'
					value={formData.email}
					id='email'
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.email
							? dataErrors.errors?.email
							: ''
					}
				/>
				<Input
					type='text'
					placeholder='Name'
					name='name'
					value={formData.name}
					id='name'
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.name
							? dataErrors.errors?.name
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Address'
					name='address'
					value={formData.address}
					id='address'
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.address
							? dataErrors.errors?.address
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Province'
					name='province'
					value={formData.province}
					id='province'
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.province
							? dataErrors.errors?.province
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='District'
					name='district'
					id='district'
					value={formData.district}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.district
							? dataErrors.errors?.district
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Sector'
					name='sector'
					id='sector'
					value={formData.sector}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.sector
							? dataErrors.errors?.sector
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Cell'
					name='cell'
					id='cell'
					value={formData.cell}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.cell
							? dataErrors.errors?.cell
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Village'
					name='village'
					id='village'
					value={formData.village}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.village
							? dataErrors.errors?.village
							: ''
					}
				/>

				<Input
					type={'number'}
					placeholder='Longitude'
					name='longitude'
					id='longitude'
					onChange={handleChange}
					value={formDataCordinates.longitude.toString()}
					error={
						dataErrors && dataErrors.touched?.longitude
							? dataErrors.errors?.longitude
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Latitude'
					name='latitude'
					id='latitude'
					value={formDataCordinates.latitude.toString()}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.latitude
							? dataErrors.errors?.latitude
							: ''
					}
				/>

				<Input
					type='text'
					placeholder='Website'
					name='website'
					id='website'
					value={formData.website}
					onChange={handleChange}
					error={
						dataErrors && dataErrors.touched?.website
							? dataErrors.errors?.website
							: ''
					}
				/>
				<Button
					type='submit'
					className='col-span-2'
					disabled={isLoading || dataErrors.hasError}
				>
					{isLoading ? 'Loading...' : 'SAVE'}
				</Button>
			</form>
		</div>
	);
}
