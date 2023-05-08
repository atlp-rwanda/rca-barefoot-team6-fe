/* eslint-disable @typescript-eslint/naming-convention */
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { LoginRes } from '../types/services/auth.types';
import cookies from '../utils/cookies';

export const BASE_URL = 'http://localhost:3000/api';

const config: AxiosRequestConfig = {
	baseURL: BASE_URL,
};

const appAxios = axios.create(config);

const interceptAxiosRequest = (request: InternalAxiosRequestConfig) => {
	const token = cookies.getCookie('user_info');

	if (token) {
		// const userInfo: LoginRes = JSON.parse(token);
		request.headers.Authorization = `Bearer ${token}`;
	}

	return request;
};

appAxios.interceptors.request.use(interceptAxiosRequest);
export default appAxios;