import { UserData } from '@/app/lib/interfaces';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react'

interface UserDataContextProps {
    name: string;
    setName: (_v: string) => void;

    pfp: string;
    setPfp: (_v: string) => void;

    email: string;
    setEmail: (_v: string) => void;
}

const UserDataContext = createContext<UserDataContextProps>({
    name: '',
    setName: () => {},

    pfp: '',
    setPfp: () => {},

    email: '',
    setEmail: () => {}
});

export const useUserDataContext = () => useContext(UserDataContext);

export function UserDataProvider({ children }: { children: ReactNode }) {
    const [nameState, setNameState] = useState<string>('dddd');
    const [pfpState, setPfpState] = useState<string>('');
    const [emailState, setEmailState] = useState<string>('');

    useEffect(() => {
        console.log(nameState, pfpState, emailState);
    }, [nameState, pfpState, emailState])

    return (
        <UserDataContext.Provider value={{
            name: nameState,
            setName: setNameState,

            pfp: pfpState,
            setPfp: setPfpState,

            email: emailState,
            setEmail: setEmailState,
        }}>
            { children }
        </UserDataContext.Provider>
    );
}