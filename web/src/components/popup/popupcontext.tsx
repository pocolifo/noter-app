import { createContext, useState, useContext, ReactNode } from 'react';

interface PopupContextProps {
    enabled: boolean;
    setEnabled: (_v: boolean) => void;
    
    stateCallback: (_v: any) => void;
    setStateCallback: (_v: any) => void;
}

export const PopupContext = createContext<PopupContextProps>({
    enabled: false,
    setEnabled: () => {},

    stateCallback: () => {},
    setStateCallback: () => {},
});

export const usePopupContext = () => useContext(PopupContext);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [enabledState, setEnabledState] = useState(false);
    const [stateCallbackState, setStateCallbackState] = useState(() => {});

    // function setPopupEnabled(v: boolean) {
    //     console.log('here');

    //     setEnabledState(v);
    // }

    return (
        <PopupContext.Provider value={{
            enabled: enabledState,
            setEnabled: setEnabledState,

            stateCallback: stateCallbackState,
            setStateCallback: setStateCallbackState,
        }}>
            { children }
        </PopupContext.Provider>
    );
};