import { createContext, Dispatch, SetStateAction, useState } from "react";
import { loggedInUser } from "../types";

interface Context {
    loggedInUser: loggedInUser | null;
    setLoggedInUser: Dispatch<SetStateAction<loggedInUser | null>>;
}

interface Props {
    children: any
}

export const LoggedInUserContext = createContext<Context | null>(null);

function LoggedInUser({children}: Props) {
    const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null);

    return (
        <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </LoggedInUserContext.Provider>
    );
}

export default LoggedInUser;

