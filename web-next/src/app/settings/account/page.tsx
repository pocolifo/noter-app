'use client';


import styles from './page.module.css';

import { usePopupContext } from '@/app/components/popup/popupcontext';
import TextField from '@/app/components/settings/TextField';
import Pfp from '@/app/components/settings/pfp';
import { changeEmail, changeName, requestChangePassword } from '@/app/lib/api';
import { useUserDataContext } from '../userdatacontext';

export default function Profile() {
	const userDataContext = useUserDataContext();
	const popupState = usePopupContext();

	async function changeNameWithState(newName: string) {
		await changeName(newName);
		userDataContext.setName(newName);
	}

	async function changeEmailWithState(newEmail: string) {
		await changeEmail(newEmail);
		userDataContext.setEmail(newEmail);
	}

	function updatePassword() {
		popupState.setEnabled(true);
		popupState.setTitle('Change password');
		popupState.setType('changePassword');
		popupState.setStateCallback(() => { });

		requestChangePassword();
	}
    
	return (
		<div className={styles.content}>
			<section>
				<div className={styles.pfpRow}>
					<Pfp
						header="Profile picture"
						value={userDataContext.pfp}
						callback={userDataContext.setPfp}
					/>

					<div>
						<h2>{ userDataContext.name }</h2>
						<p>{ userDataContext.email }</p>
					</div>
				</div>
				<div></div>
			</section>

			<section>
				<div>
					<h2>Profile</h2>
					<p>Others can see this information about you when you share notes with them. Your changes save automatically.</p>
				</div>

				<div>
					<TextField id='name' label='Name' defaultValue={userDataContext.name} onChange={ changeNameWithState } />
					<TextField id='email' type='email' label='Email' defaultValue={userDataContext.email} onChange={ changeEmailWithState } />
				</div>
			</section>

			<section>
				<div>
					<h2>Password</h2>
					<p>You will have to confirm your identity when you change your password.</p>
				</div>

				<div>
					<button onClick={updatePassword}>Change Password</button>
				</div>
			</section>
		</div>
	);
}
