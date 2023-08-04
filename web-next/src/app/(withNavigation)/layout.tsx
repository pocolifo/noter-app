'use client';

import { Inter } from 'next/font/google';
import NavBar from '../components/nav/navbar';
import { NavigationProvider } from '../components/nav/navcontext';
import Popup from '../components/popup/popup';
import { PopupProvider } from '../components/popup/popupcontext';

import styles from './layout.module.css';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
	return (
		<PopupProvider>
			<NavigationProvider>
				<Popup />

				<div className={styles.container}>
					<NavBar />

					<div>{children}</div>
				</div>
			</NavigationProvider>
		</PopupProvider>
	);
}
