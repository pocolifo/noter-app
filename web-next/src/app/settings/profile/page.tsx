'use client';

import { useEffect, useState } from 'react';

import styles from './page.module.css';

import { changePassword, getUserData, requestChangePassword } from '@/app/lib/api';
import { UserData } from '@/app/lib/interfaces';
import { UserDataProvider, useUserDataContext } from '../userdatacontext';
import Textbox from '@/app/components/settings/textbox';
import Pfp from '@/app/components/settings/pfp';
import { usePopupContext } from '@/app/components/popup/popupcontext';

export default function Profile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const userDataContext = useUserDataContext();

	const popupState = usePopupContext();

	const initialData = { ...userDataContext };

	function saveData() {
		if (initialData.name !== name) {
			userDataContext.setName(name);
		}
		if (initialData.email !== email) {
			userDataContext.setEmail(email);
		}
	}

	function updatePassword() {
		popupState.setEnabled(true);
		popupState.setTitle('Change password');
		popupState.setType('changePassword');
		popupState.setStateCallback(() => {});

		requestChangePassword();
	}

	return (
		<div className={styles.content}>
			<p className={styles.header}> Profile settings </p>
			<hr />

			<div className={styles.main}>
				<div>
					<Textbox
						header="Name"
						valueSetter={setName}
						value={userDataContext.name}
						callback={userDataContext.setName}
					/>
					<Textbox
						header="Email"
						valueSetter={setEmail}
						value={userDataContext.email}
						callback={userDataContext.setEmail}
					/>

					<div className={styles.textbox}>
						<p> Password </p>
						<button
							className={styles.button}
							onClick={() => {
								updatePassword();
							}}
						>
							{' '}
							Change password{' '}
						</button>
					</div>

					<button onClick={saveData} className={styles.button}>
						{' '}
						Update profile{' '}
					</button>
				</div>

				<Pfp
					header="Profile picture"
					value={userDataContext.pfp}
					callback={userDataContext.setPfp}
				/>
			</div>
		</div>
	);
}
