
import { hotelService } from '../services/hotel.service';
import { AxiosRequestConfig } from 'axios';

class HotelStore {

    async getAllHotels(config?: AxiosRequestConfig) {
        try {
            const response = await hotelService.getAllHotels();
            return response.data;
        } catch (error) {
            console.log("Error: ", error);
            throw new Error('Failed to get all hotels');
        }
    }


}
export default new HotelStore();