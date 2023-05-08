
export type HotelInfo= {
    name: string ;
    email: string;
    address: string;

    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;

    coordinates: {
        latitude: number;
        longitude: number;
    };
    website: string;
};

