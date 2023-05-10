import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import appAxios from '../plugins/axios';
import type {
	LoginInfo,
	LoginRes,
	ResetPasswordInfo,
} from '../types/services/auth.types';
import type { CreateUser, EditRoleType, EditUserType, UserInfo, VerifyEmail } from '../types/services/user.types';

class AuthService {
	public async updateUser(updatedUser: EditRoleType | EditUserType, id: number, config?: AxiosRequestConfig): Promise<AxiosResponse<UserInfo>> {
		return appAxios.put(`/users/${id}`, updatedUser, config);
	}
	public async getUserById(id: number | undefined): Promise<AxiosResponse<UserInfo>> {
		return appAxios.get(`/users/${id}`);
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
	public async verifyEmail(token: string | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<VerifyEmail>> {

		return appAxios.get(`/users/verify-email/${token}`, config);
	}

	public async viewUsers(config?: AxiosRequestConfig): Promise<AxiosResponse<UserInfo[]>> {
		return appAxios.get('/users', config);
	}

	public async register(newUser: CreateUser): Promise<AxiosResponse<UserInfo>> {
		return appAxios.post('/users', newUser);
	}
	
	public async requestPasswordReset(
		email: string,
	): Promise<AxiosResponse> {
		return appAxios.post('/users/request-password-reset', {email});
	}



	public async createPasswordReset(
		phoneNumber: string,
	): Promise<AxiosResponse> {
		return appAxios.post('/auth/create-password-reset', { phoneNumber });
	}

	   // reset password with token in the parameters
   	public async resetPasswordWithToken(
		resetPasswordInfo: ResetPasswordInfo,
	 ): Promise<AxiosResponse> {
		 return appAxios.post('/users/reset-password/'+resetPasswordInfo.token, {
			pass: resetPasswordInfo.password,
		 });
	 }
	 
	public async resetPassword(info: ResetPasswordInfo): Promise<AxiosResponse> {
		return appAxios.post('/auth/updated-password-reset', info);
	}
}
export const authService = new AuthService();