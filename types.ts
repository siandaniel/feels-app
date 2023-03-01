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

export interface loggedInProfessional {
  _id: string;
  fullName: string;
  email: string;
  registrationNumber: string;
  availableHours: Array<Object> | Array<any>;
  avatarURL: string;
  _v: string;
}

export interface WaitingUser {
  username: string;
  avatar_url: string;
  chatTopics: string;
  connectionID: string;
}
