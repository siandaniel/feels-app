export interface Weekdays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
}

export interface loggedInUser {
  _id: string;
  username: string;
  email: string;
  date_of_birth: string;
  date_joined: string;
  avatar_url: string;
  _v: number;
  createdAt: string;
  updatedAt: string;
}