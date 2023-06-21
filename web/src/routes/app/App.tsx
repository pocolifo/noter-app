import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import NavBar from '../../components/nav/navbar';
import Popup from '../../components/popup/popup';
// import { PopupProps } from '../../interfaces';

import { PopupProvider } from '../../components/popup/popupcontext';

// const defaultPopupContextValue = {
// 	enabled: false,
// 	title: '',

// 	stateCallback: () => {void 0;}
// };

// export const PopupContext = createContext<PopupProps>(defaultPopupContextValue);

export default function App() {
	// const [popupState, setPopupState] = useState<PopupProps>(defaultPopupContextValue);

	return (
		<PopupProvider>
			<Popup/>
			<div className="App">
				<NavBar header='test header' />

				<div id='detail'>
					<Outlet />
				</div>
			</div>
		</PopupProvider>
	);
}