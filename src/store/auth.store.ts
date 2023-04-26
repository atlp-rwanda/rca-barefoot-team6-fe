import {useMutation, useQuery} from 'react-query';
import {authService} from '../services/auth.service';

class AuthStore {
	login() {
		return useMutation(authService.login);
	}

	register() {
		return useMutation(authService.register);
	}

	createPasswordReset() {
		return useMutation(authService.createPasswordReset);
	}

	resetPassword() {
		return useMutation(authService.resetPassword);
	}
}
export default new AuthStore();