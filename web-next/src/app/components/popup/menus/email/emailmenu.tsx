import { useState } from 'react';

import styles from './emailmenu.module.css';

import { changePassword } from '@/app/lib/api';
import { useUserDataContext } from '@/app/settings/userdatacontext';
import { useNotificationContext } from '@/app/components/notification/notificationcontext';

interface MenuProps {
	submitCallback: () => void;
}

interface EmailMenuProps extends MenuProps {
	emailSetter: (value: string) => void;
	confirmEmailSetter: (value: string) => void;
}

interface CodeMenuProps extends MenuProps {
	verificationCodeSetter: (value: string) => void;
}

enum Menu {
	VERIFICATION_CODE,
	EMAIL
}

export default function ChangeEmailMenu(props: { closePopup: () => void }) {
    const notificationContext = useNotificationContext();

    const [ menu, setMenu ] = useState<Menu>(Menu.EMAIL);
    const [ email, setEmail ] = useState<string>('');
    const [ confirmEmail, setConfirmEmail ] = useState<string>('');
    const [ verificationCode, setVerificationCode ] = useState<string>('');

    async function handleSubmit() {
        try {
            await changePassword(confirmEmail, verificationCode);

            notificationContext.fire({
                title: 'Success',
                description: 'Successfully changed email',
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
        if (email === confirmEmail) {
            setMenu(Menu.VERIFICATION_CODE);
        } else {
            notificationContext.fire({
                title: 'Try again',
                description: 'Emails do not match',
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
				<EmailMenu
					submitCallback={changeMenu}
					emailSetter={setEmail}
					confirmEmailSetter={setConfirmEmail}
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

function EmailMenu(props: EmailMenuProps) {
	return (
		<div>
			<input
				className={styles.password}
				type="text"
				placeholder="New email"
				required
				onChange={(e) => props.emailSetter(e.target.value)}
			/>
			<input
				className={styles.password}
				type="text"
				placeholder="Confirm email"
				required
				onChange={(e) => props.confirmEmailSetter(e.target.value)}
			/>

			<button onClick={props.submitCallback}> Submit </button>
		</div>
	);
}
