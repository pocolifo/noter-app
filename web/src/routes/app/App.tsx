import { Outlet } from 'react-router-dom';

import NavBar from '../../components/nav/navbar';
import './App.css';

export default function App() {
	return (
		<div className="App">
			<NavBar header='test header' />

			<div id='detail'>
				<Outlet />
			</div>
		</div>
	);
}