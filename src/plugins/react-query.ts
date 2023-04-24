/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// React query for caching http requests
import {QueryClient} from 'react-query';

export const queryClient = new QueryClient(
	{
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 2,
				retryDelay: 5000,
			},
		},
	},
);