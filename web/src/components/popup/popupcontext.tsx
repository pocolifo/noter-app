import { createContext, useState, useContext, ReactNode } from 'react';

interface PopupContextProps {
    enabled: boolean;
    setEnabled: (_v: boolean) => void;

    title: string,
    setTitle: (_v: string) => void;
    
    stateCallback: (_v: any) => void;
    setStateCallback: (_v: any) => void;
}

export const PopupContext = createContext<PopupContextProps>({
    enabled: false,
    setEnabled: () => {},

    title: '',
    setTitle: () => {},

    stateCallback: () => {},
    setStateCallback: () => {},
});

export const usePopupContext = () => useContext(PopupContext);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [enabledState, setEnabledState] = useState(false);
    const [titleState, setTitleState] = useState('');
    const [stateCallbackState, setStateCallbackState] = useState<() => void>(() => {});

    return (
        <PopupContext.Provider value={{
            enabled: enabledState,
            setEnabled: setEnabledState,

            title: titleState,
            setTitle: setTitleState,

            stateCallback: stateCallbackState,
            setStateCallback: setStateCallbackState,
        }}>
            { children }
        </PopupContext.Provider>
    );
};