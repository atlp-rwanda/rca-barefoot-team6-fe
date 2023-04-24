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
	phoneNumber: string;
	password: string;
	code: string;
};