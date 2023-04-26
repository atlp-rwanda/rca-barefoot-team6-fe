import type {UserInfo} from './user.types';

export type LoginInfo = {
	email: string;
	password: string;
};

export type LoginRes = {
	user: UserInfo;
	accessToken: string;
};

export type ResetPasswordInfo = {
	password:string,
	repeatPassword:string,
	token:string|null
};