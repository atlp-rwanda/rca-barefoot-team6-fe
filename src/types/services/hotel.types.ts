export type CreateHotel = {
	name: string;
	email: string;
	address: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    website: string;
   [key: string]: any;
};

export type HotelCoordinates = {
    latitude: string|number;
    longitude: string|number ;
}

export type HotelInfo = {
	id: string;
	createdAt: string;
	updatedAt: string;
} & CreateHotel & HotelCoordinates;