import { async } from "@firebase/util";
import axios from "axios";
import { Weekdays } from "./types";
const baseURL = "https://feels-api.onrender.com/api";

const server = axios.create({ baseURL });

interface User {
  username: string;
  email: string;
  date_of_birth: string;
  avatar_url: string;
}

interface Hours {
  day: keyof Weekdays;
  hours: number[];
}

interface Pro {
  fullName: string;
  registrationNumber: string;
  email: string;
  availableHours: Hours[];
  avatarURL: string
}

export const getUser = async (username: string) => {
  const {
    data: { user },
  } = await server.get(`/users/${username}`);
  return user;
};

export const postUser = async (userData: User) => {
  const {
    data: { newProfessional },
  } = await server.post("/users", userData);
  return newProfessional;
};

export const postPro = async (proData: Pro) => {
  const {
    data: { user },
  } = await server.post("/professionals", proData);
  return user;
};


export const getPro = async (regnumber: string) => {
  const {
    data: {professional},
  } = await server.get(`/professionals/${regnumber}`);
  return professional
}


