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
			<section>
				<div className={`${styles.pfpRow} ${styles.pfpSection}`}>
					<Pfp
						header=""
						value={userDataContext.pfp}
						callback={userDataContext.setPfp}
					/>

					<div>
						<h2>{ userDataContext.name }</h2>
						<p>{ userDataContext.email }</p>
					</div>
				</div>
			</section>

			<section>
				<div className={styles.textSection}>
					<h2>Profile</h2>
					<p>Others can see this information about you when you share notes with them. Your changes save automatically.</p>
				</div>

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
				</div>
			</section>

			<section>
				<div className={styles.textSection}>
					<h2>Password</h2>
					<p>You will have to confirm your identity when you change your password.</p>
				</div>

				<div className={styles.center}>
					<button onClick={updatePassword} className={styles.button}>Change Password</button>
				</div>
			</section>
		</div>
	);
}
