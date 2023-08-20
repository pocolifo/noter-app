'use client';


import styles from './page.module.css';

import { usePopupContext } from '@/app/components/popup/popupcontext';
import TextField from '@/app/components/settings/TextField';
import Pfp from '@/app/components/settings/pfp';
import { changeEmail, changeName, requestChangePassword } from '@/app/lib/api';
import { useUserDataContext } from '../userdatacontext';

export default function Profile() {
	const userDataContext = useUserDataContext();

	return (
		<div className={`${styles.content} ${styles.grid}`}>
			<div>
				<Pfp
					header="Profile picture"
					value={userDataContext.pfp}
					callback={userDataContext.setPfp}
				/>
			</div>

			<div>
				<h2>Profile Settings</h2>
				<p>Others can see this information about you when you share notes with them. Your changes save automatically.</p>
				<TextField id='name' label='Name' defaultValue={userDataContext.name} onChange={ changeName } />
				<TextField id='email' type='email' label='Email' defaultValue={userDataContext.email} onChange={ changeEmail } />
			</div>
		</div>
	);
}
