import { useState, useRef } from 'react'
import { Icon } from '@iconify/react';

import styles from '@/app/settings/menus/menu.module.css'

import { useUserDataContext } from '@/app/settings/menus/userdatacontext'

interface PfpProps {
    header: string;

    value: string;
    callback: (_v: string) => void;
}

export default function Pfp(props: PfpProps) {
    const [imageSrc, setImageSrc] = useState(props.value);
    const inputFile = useRef<HTMLInputElement | null>(null);

    function openSelector() {
        inputFile.current.click();
    }

    function changeImage(event) {
        const image = event.target.files[0];

        try {
            let reader = new FileReader();

            reader.readAsDataURL(image);
            reader.onload = () => {
                const result = reader.result as string;

                setImageSrc(result);
                props.callback(result);
            };

            reader.onerror = (error) => {
                throw new Error(error as unknown as string); // receive as unknown first to silence error
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.textbox}>
            <p> {props.header} </p>
            <div className={styles.container} onClick={props.callback}>
                <img src={imageSrc} className={styles.pfp}/>
                <div onClick={openSelector} className={styles.pfpButton}>
                    <input 
                        type='file' 
                        accept='image/*' 
                        id='pfpupload' 
                        style={{display: 'none'}} 
                        ref={inputFile}
                        onChange={changeImage}
                    />
                    <Icon
                        icon='bx:edit'
                        className={styles.pfpIcon}
                        color='#FFFFFF'
                    />
                </div>
            </div>
        </div>
    )
}