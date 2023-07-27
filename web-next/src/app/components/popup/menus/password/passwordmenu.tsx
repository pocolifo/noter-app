import { useState } from 'react'

import styles from './password.module.css'

import { useUserDataContext } from '@/app/settings/userdatacontext';
import { changePassword } from '@/app/lib/api';

interface MenuProps {
    submitCallback: (_v?: any) => void;
}

export default function ChangePasswordMenu(props: { closePopup: () => void }) {
    const [ currentMenu, setCurrentMenu] = useState<JSX.Element>(
        CodeMenu({
            submitCallback: switchMenu
        })
    );

    let verificationCode = '';

    function handleClick() {
        const password1 = (document.getElementById('password1') as HTMLInputElement).value;
        const password2 = (document.getElementById('password2') as HTMLInputElement).value;

        if (password1 === password2) {
            changePassword(password2, verificationCode);

            props.closePopup();
            setCurrentMenu(CodeMenu({
                submitCallback: handleClick
            }));
        }
    }

    function switchMenu(code: string) {
        verificationCode = code;

        setCurrentMenu(PasswordMenu({
            submitCallback: handleClick
        }));
    }

    return (
        <div className={styles.main}>
            {currentMenu}
        </div>
    );
}

function CodeMenu(props: MenuProps) {
    const userDataContext = useUserDataContext();

    function handleClick() {
        const code = (document.getElementById('verificationCode') as HTMLInputElement).value;

        props.submitCallback(code);
    }

    return (
        <div>
            <p> A verification code has been sent to {userDataContext.email} </p>

            <input className={styles.code} id='verificationCode' type='text' placeholder='Verification code' required/>

            <button onClick={() => {
                handleClick();
            }}> Submit </button>
        </div>
    )
}

function PasswordMenu (props: MenuProps) {
    return (
        <div>
            <input className={styles.password} id='password1' type='password' placeholder='New password' required/>
            <input className={styles.password} id='password2' type='password' placeholder='Confirm password' required/>

            <button onClick={() => {
                props.submitCallback();
            }}> Submit </button>
        </div>
    )
}