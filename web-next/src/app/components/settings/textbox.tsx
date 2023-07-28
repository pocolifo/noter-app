import { useState } from 'react'

import styles from '@/app/settings/profile/page.module.css'

import { useUserDataContext } from '@/app/settings/userdatacontext';

interface TextboxProps {
    header: string;
    valueSetter: (value: string) => void;
    
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
            <input defaultValue={props.value} onChange={e => props.valueSetter(e.target.value)}/> : 
            <div>{props.value}</div>}
        </div>
    );
}