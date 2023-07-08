import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

import { userLogin } from '../../api';
import LoadingSpinner from '../../components/util/LoadingSpinner';

export default function Login() {
    const [ loggingIn, setLoggingIn ] = useState<boolean>(false);
    const [ errorState, setErrorState ] = useState<string | null>(null);
    const navigate = useNavigate();

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
                navigate('/');
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
        <div className='login-page'>
            <div className='login-panel'>
                <div className='login-title'> Login to Noter </div>

                <hr/>

                <form className='login-fields' onSubmit={ handleLogin }>
                    <input placeholder='Email' type="email" name="email" required />
                    <input placeholder='Password' type="password" name="password" required />

                    <p>{errorState}</p>

                    <button className='login-button' type='submit'>
                        { loggingIn ? <LoadingSpinner /> : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    )
}