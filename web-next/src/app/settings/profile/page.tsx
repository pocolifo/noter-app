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
	// const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const userDataContext = useUserDataContext();

	const popupState = usePopupContext();

	const initialData = { ...userDataContext };

	function changeName(name: string) {
		if (initialData.name !== name) {
			userDataContext.setName(name);
		}
	}

	function updatePassword() {
		popupState.setEnabled(true);
		popupState.setTitle('Change password');
		popupState.setType('changePassword');
		popupState.setStateCallback(() => {});

		requestChangePassword();
	}

	function updateEmail() {
		popupState.setEnabled(true);
		popupState.setTitle('Change email');
		popupState.setType('changeEmail');
		popupState.setStateCallback(() => {});

		// add email api integration
	}

	return (
		<div className={styles.content}>
			<p className={styles.header}> Profile settings </p>
			<hr />

			<div className={styles.main}>
				<div>
					<Textbox
						header="Name"
						valueSetter={() => {}}
						value={userDataContext.name}
						callback={changeName}
					/>
					<Textbox
						header="Email"
						valueSetter={setEmail}
						value={userDataContext.email}
						callback={userDataContext.setEmail}
						editCallback={updateEmail}
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
