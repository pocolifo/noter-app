'use client';

import { ReactNode, useState, useEffect } from 'react';

import styles from './layout.module.css';

import Navbar from './nav';
import Profile from './profile/page';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { UserDataProvider } from './userdatacontext';
import { PopupProvider } from '../components/popup/popupcontext';
import Popup from '../components/popup/popup';

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

					<div className={styles.content}>{children}</div>
				</div>
			</PopupProvider>
		</UserDataProvider>
	);
}
