import { Icon } from '@iconify/react';
import styles from "./nav.module.css";
import Popover from '../popover/popover';
import { useState } from 'react';

export interface FolderProps {
    title: string;
    uuid: string;

    navigateFolder: (uuid: string, title: string) => void;
    setTitle: (title: string) => void;
    delete: () => void;
}

export default function Folder(props: FolderProps) {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div className={styles.navItem}>
            <div className={styles.navItemContent} onClick={() => props.navigateFolder(props.uuid, props.title)}>
                <Icon icon="fe:folder" color="#FFFFFF" />
                <p className={styles.navItemTitle}>{props.title}</p>

                <Icon
                    className={styles.navItemOptions}
                    icon="fe:elipsis-v"
                    color="#FFFFFF"
                    onClick={(e) => {
                        setShowOptions(true)
                        e.stopPropagation()
                    }}
                />
            </div>

            {showOptions &&
                <Popover
                    title='Actions'
                    menu='EditItem'
                    align='left'
                    inputCallback={props.setTitle}
                    buttonCallback={props.delete}
                    closeCallback={() => setShowOptions(false)}
                />
            }
        </div>
    );
}