import { User } from './user.interface';

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  user: User;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProfileRequest extends Partial<Omit<Profile, 'id' | 'user'>> {}
