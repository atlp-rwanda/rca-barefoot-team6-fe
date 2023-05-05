export type CreateUser = {
	firstName: string;
	lastName: string;
	role?: string;
	email: string;
	password?: string;


};
export type EditUserType = {
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
}
export type EditRoleType = {
	id: number;
	role: string
}

export type UserInfo = {
	id: string;
	status: UserStatus;
	createdAt: string;
	updatedAt: string;

	length?: number;
} & CreateUser & EditRoleType;


export enum UserRole {
	SUPERADMIN = 'SUPERADMIN',
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export enum UserStatus {
	ACTIVE = 'ACTIVE',
}