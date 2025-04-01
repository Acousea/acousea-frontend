export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}


export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date; // Usamos Date en lugar de LocalDateTime
}

export interface ProfileInfo {
  preferredLanguage: string;
  profilePicture: string;
}

// src/app/register/models/gender.enum.ts
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface User {
  id: string;
  username: string;
  password: string;
  personalInfo: UserInfo;
  address: UserAddress;
  profileInfo: ProfileInfo;
}


export interface ValidateFieldResult {
  isValid: boolean;
  message: string;
}
