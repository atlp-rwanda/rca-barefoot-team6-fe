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

	requestPasswordReset(){
		return useMutation(authService.requestPasswordReset)
	}

	resetPassword() {
		return useMutation(authService.resetPassword);
	}
}
export default new AuthStore()