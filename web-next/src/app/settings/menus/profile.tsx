"use client";

import { useEffect, useState } from 'react'

import styles from './menu.module.css'

import { getUserData } from '@/app/lib/api'
import { UserData } from '@/app/lib/interfaces'
import { UserDataProvider, useUserDataContext } from './userdatacontext'
import Textbox from '@/app/components/settings/textbox'
import Pfp from '@/app/components/settings/pfp';

export default function Profile() {
    const userDataContext = useUserDataContext();
    const [loading, setLoading] = useState<boolean>(true);

    const initialData = { ...userDataContext };

    function saveData() {
        const newName = (document.getElementById('namefield') as HTMLInputElement).value;
        const newEmail = (document.getElementById('emailfield') as HTMLInputElement).value;

        if (initialData.name !== newName) {
            userDataContext.setName(newName);
        }
        if (initialData.email !== newEmail) {
            userDataContext.setEmail(newEmail);
        }
    }

    return (
        <div className={styles.content}>
            <p className={styles.header}> Profile settings </p>
            <hr/>

            <div className={styles.main}>
                <div>
                    <Textbox 
                        header='Name'
                        inputId='namefield'
                        value={userDataContext.name}
                        callback={userDataContext.setName}
                    />
                    <Textbox 
                        header='Email'
                        inputId='emailfield'
                        value={userDataContext.email}
                        callback={userDataContext.setEmail}
                    />

                    <div className={styles.textbox}>
                        <p> Password </p>
                        <button className={styles.button}> Change password </button>
                    </div>
                    
                    <button onClick={saveData} className={styles.button}> Update profile </button>
                </div>
                
                <Pfp
                    header='Profile picture'
                    value={userDataContext.pfp}
                    callback={userDataContext.setPfp}
                />
            </div>
        </div>
    )
}