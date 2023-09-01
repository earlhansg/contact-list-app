export interface User {
  _id: string;
  name: string;
  email: string;
  telephoneNumber: string;
  favoriteFlag: string;
  updatedAt: string;
  createdAt: string;
}

export type UserForm = Omit<User, '_id' | 'updatedAt' | 'createdAt'>;

export type AddContactResponse = {
  message: string;
  contact: User | null;
}