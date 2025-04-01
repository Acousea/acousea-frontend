// user.model.ts
export interface User {
  id: string;
  username: string;
  password: string;
  personalInfo: UserInfo;
  profile: UserProfile;
  address: UserAddress;
  accountStatus: UserStatus;
  role: UserRole;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

export interface UserProfile {
  profileImageUrl: string;
  preferredLanguage: string;
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserStatus {
  active: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  loginAttempts: number;
  passwordChangedAt: string;
}

export type UserRole = 'ADMIN' | 'USER';
