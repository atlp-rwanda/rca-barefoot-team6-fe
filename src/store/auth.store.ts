import { useMutation, useQuery } from 'react-query';
import { authService } from '../services/auth.service';
import { EditRoleType, EditUserType } from '../types/services/user.types';
import { AxiosRequestConfig } from 'axios';
class AuthStore {
	async updateUser(updatedUser: EditRoleType | EditUserType, id: number, config?: AxiosRequestConfig) {
		try {
			const response = await authService.updateUser(updatedUser, id, config);
			return response.data;
		} catch (error) {
			console.log("Error: ", error);
			throw new Error('Failed to update user');
		}
	}
	async logout(config?: AxiosRequestConfig) {
		try {
			const response = await authService.logout(config);
			return response.data;
		} catch (error) {
			throw new Error('Logout Failed');
		}
	}
	login() {
		return useMutation(authService.login);
	}
	register() {
		return useMutation(authService.register);
	}
	createPasswordReset() {
		return useMutation(authService.createPasswordReset);
	}

	requestPasswordReset(){
		return useMutation(authService.requestPasswordReset)
	}

	resetPassword() {
		return useMutation(authService.resetPasswordWithToken);
	}
}
export default new AuthStore();