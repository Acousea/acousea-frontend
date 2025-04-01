import {User} from "@/app/services/auth/user-service/user.interfaces";

export const mockUser: User = {
  id: 'mock',
  username: 'mockUser',
  password: 'mockPassword',
  personalInfo: {
    firstName: 'Mock',
    lastName: 'User',
    email: 'mockuser@example.com',
    phoneNumber: '123-456-7890',
    dateOfBirth: '1990-01-01',
    gender: 'Other'
  },
  profile: {
    profileImageUrl: 'http://example.com/mockuser.jpg',
    preferredLanguage: 'en'
  },
  address: {
    street: '123 Mock St',
    city: 'Mock City',
    state: 'Mock State',
    postalCode: '12345',
    country: 'Mock Country'
  },
  accountStatus: {
    active: true,
    emailVerified: true,
    phoneVerified: false,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    lastLogin: '2023-01-01T00:00:00Z',
    loginAttempts: 0,
    passwordChangedAt: '2023-01-01T00:00:00Z'
  },
  role: 'USER'
};
