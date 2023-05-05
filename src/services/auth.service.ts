import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import appAxios from '../plugins/axios';
import type {
	LoginInfo,
	LoginRes,
	ResetPasswordInfo,
} from '../types/services/auth.types';
import type { CreateUser, EditRoleType, EditUserType, RequestInfo, UserInfo } from '../types/services/user.types';

class AuthService {
	public async updateUser(updatedUser: EditRoleType | EditUserType, id: number, config?: AxiosRequestConfig): Promise<AxiosResponse<UserInfo>> {
		return appAxios.put(`/users/${id}`, updatedUser, config);
	}
	public async getUserById(id: number): Promise<AxiosResponse<UserInfo>> {
		return appAxios.get(`/users/:${id}`);
	}
	public async login(loginInfo: LoginInfo): Promise<AxiosResponse<LoginRes>> {
		return appAxios.post('/users/login', loginInfo);
	}

	public async logout(config?: AxiosRequestConfig): Promise<AxiosResponse> {
		return appAxios.put('/users/logout', config);
	}

	public async viewProfile(config?: AxiosRequestConfig): Promise<AxiosResponse<UserInfo>> {
		return appAxios.get('/users/self', config);
	}

	public async viewRequests(): Promise<AxiosResponse<RequestInfo[]>> {
		return appAxios.get('/requests');
	}

	public async viewUsers(config?: AxiosRequestConfig): Promise<AxiosResponse<UserInfo[]>> {
		return appAxios.get('/users', config);
	}

	public async register(newUser: CreateUser): Promise<AxiosResponse<UserInfo>> {
		return appAxios.post('/users', newUser);
	}

	public async createPasswordReset(
		phoneNumber: string,
	): Promise<AxiosResponse> {
		return appAxios.post('/auth/create-password-reset', { phoneNumber });
	}

	public async resetPassword(info: ResetPasswordInfo): Promise<AxiosResponse> {
		return appAxios.post('/auth/updated-password-reset', info);
	}
}
export const authService = new AuthService();