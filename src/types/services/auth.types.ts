import type { UserInfo } from './user.types';

export type LoginInfo = {
	email: string;
	password: string;
};

export type LoginRes = {
	user: UserInfo;
	email?: string;
	firstName?: UserInfo;
	lastName?: string;
	token: string;
	accessToken: string;
};

export type ResetPasswordInfo = {
	phoneNumber: string;
	password: string;
	code: string;
};