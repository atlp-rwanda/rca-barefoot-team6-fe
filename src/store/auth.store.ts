import { useMutation } from 'react-query';
import { authService } from '../services/auth.service';


class AuthStore {
	token: string | undefined;
	setToken(token: string | undefined) {
		this.token = token;
	}
	getToken() {
		return this.token;

	}
	login() {
		return useMutation(authService.login);
	}
	register() {
		return useMutation(authService.register);
	}


	updateUser() {
		return useMutation(authService.updateUser);
	}


	createPasswordReset() {
		return useMutation(authService.createPasswordReset);
	}

	resetPassword() {
		return useMutation(authService.resetPassword);
	}
}
export default new AuthStore();