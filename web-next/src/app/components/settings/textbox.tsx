import { useState } from 'react'

import styles from '../../settings/menus/menu.module.css'

import { useUserDataContext } from '@/app/settings/menus/userdatacontext';

interface TextboxProps {
    header: string;

    value: string;
    callback: (_v: string) => void;
}

export default function Textbox(props: TextboxProps) {
    const userDataContext = useUserDataContext();

    const [editing, setEditing] = useState(true);
    
    return (
        <div className={styles.textbox}>
            <p> {props.header} </p>

            {editing ? 
            <input defaultValue={props.value}/> : 
            <p>hello</p>}
        </div>
    );
}