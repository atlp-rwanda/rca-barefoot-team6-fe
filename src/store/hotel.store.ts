import { hotelService } from './../services/hotel.service';
import {useMutation, useQuery} from 'react-query';

class HotelStore {
	create() {
		return useMutation(hotelService.createHotel);
	}

	getHotel(id: string) {
		return useMutation(() => hotelService.getHotel(id));
	}

	getHotels() {
		return useMutation(hotelService.getHotels);
	}
}
export default new HotelStore();