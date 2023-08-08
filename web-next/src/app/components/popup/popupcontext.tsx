import { createContext, useState, useContext, ReactNode } from 'react';

interface PopupContextProps {
	enabled: boolean;
	setEnabled: (_v: boolean) => void;

	title: string;
	setTitle: (_v: string) => void;

	type: string;
	setType: (_v: string) => void;

	stateCallback: (_v: any) => void;
	setStateCallback: (_v: any) => void;
}

export const PopupContext = createContext<PopupContextProps>({
	enabled: false,
	setEnabled: () => {},

	title: '',
	setTitle: () => {},

	type: '',
	setType: () => {},

	stateCallback: () => {},
	setStateCallback: () => {}
});

export const usePopupContext = () => useContext(PopupContext);

export function PopupProvider({ children }: { children: ReactNode }) {
	const [enabledState, setEnabledState] = useState(false);
	const [titleState, setTitleState] = useState('');
	const [typeState, setTypeState] = useState('');
	const [stateCallbackState, setStateCallbackState] = useState<() => void>(() => {});

	return (
		<PopupContext.Provider
			value={{
				enabled: enabledState,
				setEnabled: setEnabledState,

				title: titleState,
				setTitle: setTitleState,

				type: typeState,
				setType: setTypeState,

				stateCallback: stateCallbackState,
				setStateCallback: setStateCallbackState
			}}
		>
			{children}
		</PopupContext.Provider>
	);
}
