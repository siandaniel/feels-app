import { Children, createContext, Dispatch, SetStateAction, useState } from "react";

interface Context {
    loggedInUser: loggedInUser;
    setLoggedInUser: Dispatch<SetStateAction<loggedInUser>>;
}

interface Props {
    children: any
}

interface loggedInUser {
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

export const LoggedInUserContext = createContext<Context | null>(null);

function LoggedInUser({children}: Props) {
    const [loggedInUser, setLoggedInUser] = useState<loggedInUser>({
        _id: "",
        username: "",
        email: "",
        date_of_birth: "",
        date_joined: "",
        avatar_url: "",
        _v: 0,
        createdAt: "",
        updatedAt: "",
      });

    return (
        <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </LoggedInUserContext.Provider>
    );
}

export default LoggedInUser;

