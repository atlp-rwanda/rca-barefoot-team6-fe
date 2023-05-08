import type {Axios, AxiosResponse} from 'axios';
import appAxios from '../plugins/axios';

import type { CreateHotel, HotelInfo } from '../types/services/hotel.types';


class HotelService {

	public async createHotel(newHotel: CreateHotel): Promise<AxiosResponse<HotelInfo>> {
		return appAxios.post('/hotels', newHotel);
	}

    public async getHotels(): Promise<AxiosResponse<HotelInfo>> {
		return appAxios.get('/hotels');
	}
    
    public async getHotel(id: string): Promise<AxiosResponse<HotelInfo>> {
		return appAxios.get(`/hotels/${id}`);
	}

	public async updateHotel(id: string, updatedHotel: CreateHotel): Promise<AxiosResponse<HotelInfo>> {
		return appAxios.put(`/hotels/${id}`, updatedHotel);
	}

	public async deleteHotel(id: string): Promise<AxiosResponse<HotelInfo>> {
		return appAxios.delete(`/hotels/${id}`);
	}
	
}
export const hotelService = new HotelService();