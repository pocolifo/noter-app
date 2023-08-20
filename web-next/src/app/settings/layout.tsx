'use client';

import { ReactNode } from 'react';

import styles from './layout.module.css';

import Popup from '../components/popup/popup';
import { PopupProvider } from '../components/popup/popupcontext';
import Navbar from './nav';
import { UserDataProvider } from './userdatacontext';

export interface LinkItem {
	title: string;
	route: string;
}

export default function SettingsLayout({ children }: { children: ReactNode }) {
	const linkList: LinkItem[] = [
		{
			title: 'Profile',
			route: 'profile'
		},
		{
			title: 'Password',
			route: 'password'
		},
		{
			title: 'Test 1',
			route: 'test'
		}
	];

	return (
		<UserDataProvider>
			<PopupProvider>
				<Popup />

				<div className={styles.main}>
					<Navbar linkList={linkList} />

					<main className={styles.content}>{children}</main>
				</div>
			</PopupProvider>
		</UserDataProvider>
	);
}
