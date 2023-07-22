"use client";

import { useState } from 'react';

import styles from './page.module.css';

import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/util/LoadingSpinner';
import { userLogin } from '../lib/api';
import { Playfair_Display } from 'next/font/google';

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

export default function Login() {
    const [ loggingIn, setLoggingIn ] = useState<boolean>(false);
    const [ errorState, setErrorState ] = useState<string | null>(null);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        setLoggingIn(true);
        e.preventDefault();
        let target = e.currentTarget as HTMLFormElement;
        let formData = new FormData(target);

        let email = formData.get('email');
        if (email === null) {
            setErrorState('Missing email');
            setLoggingIn(false);
            return;
        }

        let password = formData.get('password');
        if (password === null) {
            setErrorState('Missing password');
            setLoggingIn(false);
            return;
        }

        try {
            let loggedInSuccessfully = await userLogin(email.toString(), password.toString());
            
            if (loggedInSuccessfully) {
                router.push('/');
            } else {
                setErrorState('Bad credentials');
            }
        } catch (e) {
            setErrorState(String(e));
        } finally {
            setLoggingIn(false);
        }
    }

    return (
        <div className={`${styles.loginPage} ${playfairDisplay}`}>
            <div className={styles.loginPanel}>
                <div className={styles.loginTitle}> Log in to <strong>Noter.</strong></div>

                <hr className={styles.hr} />

                <form className={styles.loginFields} onSubmit={ handleLogin }>
                    <input placeholder='Email' type="email" name="email" required />
                    <input placeholder='Password' type="password" name="password" required />

                    <p>{errorState}</p>

                    <button className={styles.loginButton} type='submit' disabled={loggingIn}>
                        { loggingIn ? <LoadingSpinner /> : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    )
}