import { createContext, Dispatch, SetStateAction, useState } from "react";

interface Props {
    children: any
}

interface Context {
    proChats: string[] | null;
    setProChats: Dispatch<SetStateAction<string[] | null>>
}

export const ProChats = createContext<Context | null>(null)

function ProChatsContext({children}: Props) {
    const [proChats, setProChats] = useState<string[] | null>(null)
    return (
        <ProChats.Provider value={{proChats, setProChats}}>
            {children}
        </ProChats.Provider>
    );
}

export default ProChatsContext;