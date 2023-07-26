"use client";

import { UserData } from '@/app/lib/interfaces';
import { getUserData, changeName, changePfp, changeEmail } from '@/app/lib/api';
import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react'

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
    setName: (_v: string) => {},

    pfp: '',
    setPfp: (_v: string) => {},

    email: '',
    setEmail: (_v: string) => {}
});

export const useUserDataContext = () => useContext(UserDataContext);

export function UserDataProvider({ children }: { children: ReactNode }) {
    const [nameState, setNameState] = useState<string>('');
    const [pfpState, setPfpState] = useState<string>('');
    const [emailState, setEmailState] = useState<string>('');

    useEffect(() => {
        getUserData()
        .then((data) => {
            setNameState(data.name);
            setPfpState(data.pfp);
            setEmailState(data.email);
        });
    }, [])
    
    useEffect(() => {
        if (pfpState !== '') {
            changePfp(pfpState)
        }
    }, [pfpState]);

    useEffect(() => {
        if (nameState !== '') {
            changeName(nameState)
        }
    }, [nameState]);

    useEffect(() => {
        if (emailState !== '') {
            changeEmail(emailState)
        }
    }, [emailState]);

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