import { createContext, useState, useContext, ReactNode } from 'react';
import { PathSegment } from '../../interfaces';

interface NavigationContextProps {
    path: PathSegment[];
    setPath: (_v: PathSegment[]) => void;
}

const NavigationContext = createContext<NavigationContextProps>({
    path: [],
    setPath: () => {},
});

export const useNavigationContext = () => useContext(NavigationContext);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [pathState, setPathState] = useState<PathSegment[]>([]);

    return (
        <NavigationContext.Provider value={{
            path: pathState,
            setPath: setPathState,
        }}>
            { children }
        </NavigationContext.Provider>
    );
}