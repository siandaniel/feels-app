import axios from "axios";
import { Weekdays } from "../types";
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
  avatarURL: string;
}

export const getUser = async (username: string) => {
  const {
    data: { user },
  } = await server.get(`/users/${username}`);
  return user;
};

export const postUser = async (userData: User) => {
  const {
    data: { user },
  } = await server.post("/users", userData);
  return user;
};

export const postPro = async (proData: Pro) => {
  const {
    data: { newProfessional },
  } = await server.post("/professionals", proData);
  return newProfessional;
};

export const getPro = async (regnumber: string) => {
  const {
    data: { professional },
  } = await server.get(`/professionals/${regnumber}`);
  return professional;
};

export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10).split("-").reverse().join("/");
};

export const validateDate = (day: number, month: number, year: number) => {
  if (
    day.toString().includes(".") ||
    month.toString().includes(".") ||
    year.toString().includes(".")
  )
    return false;
  const eighteenYearsAgo = new Date().getFullYear() - 18;
  if (year > eighteenYearsAgo) return false;
  if (month > 0 && month < 13 && day > 0 && day < 32 && year > 0) {
    if (month === 2) {
      if (year % 4 === 0) {
        if (day > 29) return false;
      } else if (day > 28) return false;
      else return true;
    } else if (month === 9 || month === 4 || month === 6 || month === 11) {
      if (day > 30) return false;
      else return true;
    } else if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      if (day > 31) return false;
      else return true;
    }
  } else return false;
};

export const validatePassword = (value: string) => {
  if (value.length === 0) return true;
  return !(value.length < 6);
};

export const validateEmail = (email: string) => {
  if (email.length === 0) return true;
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const validateRegNumber = (reg: string) => {
  if (reg.length === 0) return true;
  return /^CP\d{6}$/g.test(reg);
};

export const getUserMoods = (username: String) => {
  let apiQuery = `/mood_data/${username}`;
  return server.get(apiQuery)
  .then(({data}) => {
      return data.moodData;
  })
}

export const updateUserMood = (username: String, body: Object) => {
  let apiQuery = `/mood_data/${username}`;

  return server.patch(apiQuery, body)
  .then(({data}) => {
      return data.updatedMoodData.mood_data;
  })
}

export const initialiseUserMoods = (body: object) => {
  let apiQuery = `/mood_data`;

  return server.post(apiQuery, body)
  .then(({data}) => {
    console.log(data.moodData);
  })
}