import { Children, createContext, Dispatch, SetStateAction, useState } from "react";

interface Context {
    loggedInUser: loggedInUser;
    setLoggedInUser: Dispatch<SetStateAction<loggedInUser>>;
}

interface Props {
    children: any
}

interface loggedInUser {
    _id: String;
    username: String;
    email: String;
    date_of_birth: String;
    date_joined: String;
    avatar_url: String;
    _v: Number;
    createdAt: String;
    updatedAt: String;
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

