import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import NavBar from '../../components/nav/navbar';
import Popup from '../../components/popup/popup';
import { PopupProvider } from '../../components/popup/popupcontext';

export default function App() {
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