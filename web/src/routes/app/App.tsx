import { Outlet } from 'react-router-dom';
import NavBar from '../../components/nav/navbar';
import Popup from '../../components/popup/popup';
import { PopupProvider } from '../../components/popup/popupcontext';

import './App.css';


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