import { useState } from 'react'

import styles from '../../settings/menus/menu.module.css'

import { useUserDataContext } from '@/app/settings/menus/userdatacontext';

interface TextboxProps {
    header: string;
    inputId: string;

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
            <input id={props.inputId} defaultValue={props.value}/> : 
            <div>{props.value}</div>}
        </div>
    );
}