import { Outlet, useNavigate } from 'react-router-dom';

import './App.css';

import NavBar from '../../components/nav/navbar';
import Popup from '../../components/popup/popup';
import { PopupProvider } from '../../components/popup/popupcontext';
import { authenticate } from '../../api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/util/LoadingSpinner';

export default function App() {
	const navigate = useNavigate()
	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if (document.cookie === '') {
			navigate('/login')
			return
		}
		
		authenticate().then(result => {
			if (result) setLoggedIn(true)
			else navigate('/login')
		})
	}, [])

	return (
		<>
			{loggedIn ? 
				<PopupProvider>
					<Popup/>
					<div className="App">
						<NavBar header='Noter' />
						
						<div id='detail'>
							<Outlet />
						</div>
					</div>
				</PopupProvider>
			: <LoadingSpinner/>}
		</>
	);
}