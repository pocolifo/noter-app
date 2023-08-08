import { useState } from 'react';

import styles from './passwordmenu.module.css';

import { changePassword } from '@/app/lib/api';
import { useUserDataContext } from '@/app/settings/userdatacontext';
import { useNotificationContext } from '@/app/components/notification/notificationcontext';

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
    const notificationContext = useNotificationContext();

    const [ menu, setMenu ] = useState<Menu>(Menu.PASSWORD);
    const [ password, setPassword ] = useState<string>('');
    const [ confirmPassword, setConfirmPassword ] = useState<string>('');
    const [ verificationCode, setVerificationCode ] = useState<string>('');

    async function handleSubmit() {
        try {
            await changePassword(confirmPassword, verificationCode);

            notificationContext.fire({
                title: 'Success',
                description: 'Successfully changed password',
                type: 'success'
            });

            props.closePopup();
        } catch (error) {
            notificationContext.fire({
                title: 'Error',
                description: 'Invalid verification code',
                type: 'error'
            })
        }
    }

    function changeMenu() {
        if (password === confirmPassword) {
            setMenu(Menu.VERIFICATION_CODE);
        } else {
            notificationContext.fire({
                title: 'Try again',
                description: 'Passwords do not match',
                type: 'error'
            })
        }
    }

	return (
		<div className={styles.main}>
			{menu === Menu.VERIFICATION_CODE ? (
				<CodeMenu
					submitCallback={handleSubmit}
					verificationCodeSetter={setVerificationCode}
				/>
			) : (
				<PasswordMenu
					submitCallback={changeMenu}
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
