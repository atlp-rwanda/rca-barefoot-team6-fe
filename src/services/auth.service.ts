import type {Axios, AxiosResponse} from 'axios';
import appAxios from '../plugins/axios';
import type {
	LoginInfo,
	LoginRes,
	ResetPasswordInfo,
} from '../types/services/auth.types';
import type {CreateUser, UserInfo} from '../types/services/user.types';

class AuthService {
	public async login(loginInfo: LoginInfo): Promise<AxiosResponse<LoginRes>> {
		return appAxios.post('/users/login', loginInfo);
	}

	public async register(newUser: CreateUser): Promise<AxiosResponse<UserInfo>> {
		return appAxios.post('/users', newUser);
	}

	public async createPasswordReset(
		email: string,
	): Promise<AxiosResponse> {
		return appAxios.post('/users/request-password-reset', {email});
	}

	public async resetPassword(info: ResetPasswordInfo): Promise<AxiosResponse> {
	
		return appAxios.post(`/users/reset-password/${info.token}`,info);
	}
}
export const authService = new AuthService();