import { HotelInfo } from "../../types/services/hotel.types";


interface InputProps{
	hotel: HotelInfo;
}

export default function ViewMore(props: InputProps) {
	const {hotel} = props;
	return (
		<div className='max-w-2xl mx-auto py-8'>
			<div className='bg-white shadow-lg rounded-lg px-8 py-6'>
				<h2 className='text-2xl font-semibold mb-2'>{hotel.name}</h2>
				<p className='text-gray-700 text-sm mb-4'>{hotel.address}</p>
				<p className='text-gray-700 text-sm mb-4'>Email: {`${hotel.email}`}</p>
				<p className='text-gray-700 text-sm mb-4'>Website: {`${hotel.website}`}</p>
				<div className='flex flex-row items-center mb-4'>
					<p className='text-gray-700 text-sm mr-4'>Location:</p>
					<p className='text-gray-700 text-sm'>
						{`${hotel.province}, ${hotel.district}, ${hotel.sector}, ${hotel.village}, ${hotel.cell}`}
					</p>
				</div>
				<div className='flex flex-row items-center'>
					<p className='text-gray-700 text-sm mr-4'>Coordinates:</p>
					<p className='text-gray-700 text-sm'>
						Latitude: {`${hotel.coordinates?.latitude}`}, Longitude: {`${hotel.coordinates?.longitude}`}
					</p>
				</div>
			</div>
		</div>
	);
};