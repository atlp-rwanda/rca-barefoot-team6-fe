export type CreateUser = {
	firstName: string;
	lastName: string;
	role?: string;
	email: string;
	password?: string;


export type EditUser = {
	firstName: string;
	lastName: string;
	email: string;
	role?: string
};


export type UserInfo = {
	id: string;
	status: UserStatus;
	createdAt: string;
	updatedAt: string;

} & CreateUser | EditUser;


export enum UserRole {
	SUPERADMIN = 'SUPERADMIN',
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export enum UserStatus {
	ACTIVE = 'ACTIVE',
}