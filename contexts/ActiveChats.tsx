import { createContext, Dispatch, SetStateAction, useState } from "react";

interface Props {
    children: any
}

interface Context {
    activeChat: string | null;
    setActiveChat: Dispatch<SetStateAction<string | null>>
}

export const ActiveChat = createContext<Context | null>(null)

function ActiveChatsContext({children}: Props) {
    const [activeChat, setActiveChat] = useState<string | null>(null)
    return (
        <ActiveChat.Provider value={{activeChat, setActiveChat}}>
            {children}
        </ActiveChat.Provider>
    );
}

export default ActiveChatsContext;