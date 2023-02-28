import { createContext, Dispatch, SetStateAction, useState } from "react";
import { loggedInProfessional } from "../types";

interface Context {
    loggedInProfessional: loggedInProfessional | null;
    setLoggedInProfessional: Dispatch<SetStateAction<loggedInProfessional | null>>
}

interface Props {
    children: any
}

export const LoggedInProfessionalContext = createContext<Context | null>(null);

function LoggedInProfessional({children}: Props) {
    const [loggedInProfessional, setLoggedInProfessional] = useState<loggedInProfessional | null>(null);
    return (
        <LoggedInProfessionalContext.Provider value={{loggedInProfessional, setLoggedInProfessional}}>
            {children}
        </LoggedInProfessionalContext.Provider>
    );
}

export default LoggedInProfessional;