import * as React from 'react';
import { createContext, useState, useContext, ReactNode } from 'react';

interface NavigationContextProps {
    path: string[];
    setPath: (_v: string[]) => void;
}

const NavigationContext = createContext<NavigationContextProps>({
    path: [],
    setPath: () => {},
});

export const useNavigationContext = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [pathState, setPathState] = useState<string[]>([]);

    return (
        <NavigationContext.Provider value={{
            path: pathState,
            setPath: setPathState,
        }}>
            { children }
        </NavigationContext.Provider>
    );
}