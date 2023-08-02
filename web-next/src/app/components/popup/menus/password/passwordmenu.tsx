import { useState } from 'react';

import styles from './passwordmenu.module.css';

import { changePassword } from '@/app/lib/api';
import { useUserDataContext } from '@/app/settings/userdatacontext';

interface MenuProps {
	submitCallback: () => void;
}

interface PasswordMenuProps extends MenuProps {
	passwordSetter: (value: string) => void;
	confirmPasswordSetter: (value: string) => void;
}

interface CodeMenuProps extends MenuProps {
	verificationCodeSetter: (value: string) => void;
}

enum Menu {
	VERIFICATION_CODE,
	PASSWORD
}

export default function ChangePasswordMenu(props: { closePopup: () => void }) {
	const [menu, setMenu] = useState<Menu>(Menu.VERIFICATION_CODE);
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [verificationCode, setVerificationCode] = useState<string>('');

	function handleClick() {
		if (password === confirmPassword) {
			changePassword(confirmPassword, verificationCode);

			props.closePopup();
		}
	}

	return (
		<div className={styles.main}>
			{menu === Menu.VERIFICATION_CODE ? (
				<CodeMenu
					submitCallback={() => setMenu(Menu.PASSWORD)}
					verificationCodeSetter={setVerificationCode}
				/>
			) : (
				<PasswordMenu
					submitCallback={handleClick}
					passwordSetter={setPassword}
					confirmPasswordSetter={setConfirmPassword}
				/>
			)}
		</div>
	);
}

function CodeMenu(props: CodeMenuProps) {
	const userDataContext = useUserDataContext();

	return (
		<div>
			<p> A verification code has been sent to {userDataContext.email} </p>

			<input
				className={styles.code}
				type="text"
				placeholder="Verification code"
				required
				onChange={(e) => {
					props.verificationCodeSetter(e.target.value);
				}}
			/>

			<button onClick={props.submitCallback}> Submit </button>
		</div>
	);
}

function PasswordMenu(props: PasswordMenuProps) {
	return (
		<div>
			<input
				className={styles.password}
				type="password"
				placeholder="New password"
				required
				onChange={(e) => props.passwordSetter(e.target.value)}
			/>
			<input
				className={styles.password}
				type="password"
				placeholder="Confirm password"
				required
				onChange={(e) => props.confirmPasswordSetter(e.target.value)}
			/>

			<button onClick={props.submitCallback}> Submit </button>
		</div>
	);
}
