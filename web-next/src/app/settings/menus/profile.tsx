import { useEffect, useState } from 'react'

import styles from './menu.module.css'

import { getUserData } from '@/app/lib/api'
import { UserData } from '@/app/lib/interfaces'
import { useUserDataContext } from './userdatacontext'
import Textbox from '@/app/components/settings/textbox'

export default function Profile() {
    const userDataContext = useUserDataContext();

    const [loading, setLoading] = useState<boolean>(true);

    function setUserData(data: UserData) {
        userDataContext.setName(data.name);
        userDataContext.setPfp(data.pfp);
        userDataContext.setEmail(data.email);
    
        console.log(data.name + userDataContext.name)
    }

    useEffect(() => {
        console.log('using effect');
        getUserData()
        .then((data) => {
            userDataContext.setName(data.name);
            userDataContext.setPfp(data.pfp);
            userDataContext.setEmail(data.email);
            // setUserData(data)
        })
        .finally(() => setLoading(false));
    }, []);


    return (
        <div className={styles.content}>
            <p className={styles.header}> Profile settings </p>
            <hr/>

            <Textbox 
                header='Name'
                value={userDataContext.name}
                callback={userDataContext.setName}
            />
        </div>
    )
}