export type ReferralStatus = "claimed" | "none" | "pending";
export type KycStatus = "notSubmitted" | "pending" | "approved" | "rejected";

export interface Referral {
	code: string;
	status: ReferralStatus;
}

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	username: string;
	email: string;
	phone: string;
	dob: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	documentFront?: string;
	documentBack?: string;
	documentNumber?: string;
	documentExpDate?: string;
	password: string;
	deposit: number;
	interest: number;
	withdraw: number;
	bonus: number;
	profileImage: string;
	referral: Referral;
	kycStatus: KycStatus;
	isAdmin: boolean;
	mfa: boolean;
	idVerified: boolean;
	isEmailVerified: boolean;
	accountStatus: "pending" | "suspended" | "deactivated";
	createdAt: Date;
}

// Optional: Create a separate type for user creation (without auto-generated fields)
export interface CreateUserInput {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	phone?: string;
	dob?: string;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	country?: string;
	documentFront?: string;
	documentBack?: string;
	documentNumber?: string;
	documentExpDate?: string;
	password: string;
	profileImage?: string;
	referral?: Referral;
}
