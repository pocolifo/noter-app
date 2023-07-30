import { Icon } from '@iconify/react';
import { PopoverProps } from '../popover'

import styles from "./createnew.module.css";

interface ButtonInfo {
    text: string;
    icon: string;
}

interface ButtonProps {
    info: ButtonInfo;

    onClick: () => void;
}

export default function PopoverCreateNew(props: PopoverProps) {
    const buttons: ButtonInfo[] = [
        {
            text: 'Header',
            icon: 'fe:text-size'
        },
        {
            text: 'Text',
            icon: 'fe:text-align-left'
        },
        {
            text: 'Image',
            icon: 'fe:picture'
        },
        {
            text: 'Summary',
            icon: 'fe:feather'
        },
        {
            text: 'Quiz',
            icon: 'material-symbols:quiz'
        }
    ]


    return (
        <>
            {buttons.map((buttonData, i) => (
                <Button
                    info={buttonData}
                    onClick={() => {
                        props.inputCallback(buttonData.text.toLowerCase())
                        props.closeCallback();
                    }}
                    key={i}
                />
            ))}
        </>
    )
}


function Button(props: ButtonProps) {
    return (
        <div className={styles.createNew} onClick={props.onClick}>
            <Icon
                icon={props.info.icon}
                color='#FFFFFF'
                className={styles.buttonIcon}
            />

            <p className={styles.buttonText}>
                {props.info.text}
            </p>
        </div>
    );
}