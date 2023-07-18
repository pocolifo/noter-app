import { Icon } from '@iconify/react';

import styles from './menus.module.css'

interface CreateNewMenuProps {
    studyguideaction: () => void;
    noteaction: () => void;
    folderaction: () => void;
}

export default function CreateNewMenu(props: CreateNewMenuProps) {

    return (
        <div className={styles.createNew}>
            <div className={styles.createNewOption}>
                <button 
                    className={styles.createNewButton}
                    onClick={() => props.studyguideaction()}
                    style={{backgroundColor: '#F472B6'}}
                    >
                    <Icon className={styles.icon} icon="fe:document" color='#FFFFFF'/>
                </button>
                <p className={styles.label}>Study Guide</p>
            </div>

            <div className={styles.createNewOption}>
                <button
                    className={styles.createNewButton}
                    onClick={() => props.noteaction()}
                    style={{backgroundColor: '#C084FC'}}
                    >
                    <Icon className={styles.icon} icon="fe:book" color='#FFFFFF'/>
                </button>
                <p className={styles.label}>Note</p>
            </div>

            <div className={styles.createNewOption}>
                <button
                    className={styles.createNewButton}
                    onClick={() => props.folderaction()}
                    style={{backgroundColor: '#60A5FA'}}
                    >
                    <Icon className={styles.icon} icon="fe:folder" color='#FFFFFF'/>
                </button>
                <p className={styles.label}>Folder</p>
            </div>
        </div>
    )
}