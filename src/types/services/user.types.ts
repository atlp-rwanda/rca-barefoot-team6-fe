export type CreateUser = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type UserInfo = {
	id: string;
	status: UserStatus;
	createdAt: string;
	updatedAt: string;
} & CreateUser;

export enum UserRole {
	SUPERADMIN = 'SUPERADMIN',
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export enum UserStatus {
	ACTIVE = 'ACTIVE',
}
export type EmailChecker ={
	email:""
}