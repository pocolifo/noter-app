import { Icon } from '@iconify/react';
import styles from './createNewMenu.module.css';

interface CreateNewMenuProps {
    studyguideaction: () => void;
    noteaction: () => void;
    folderaction: () => void;
}

export default function CreateNewMenu(props: CreateNewMenuProps) {

    return (
        <div className={styles.createNew}>
            <div className={styles.option}>
                <button
                    onClick={() => props.studyguideaction()}
                    style={{ backgroundColor: '#F472B6' }}
                >
                    <Icon className={styles.icon} icon="fe:document" color='#FFFFFF' />
                </button>
                <p>Study Guide</p>
            </div>

            <div className={styles.option}>
                <button
                    onClick={() => props.noteaction()}
                    style={{ backgroundColor: '#C084FC' }}
                >
                    <Icon className={styles.icon} icon="fe:book" color='#FFFFFF' />
                </button>
                <p>Note</p>
            </div>

            <div className={styles.option}>
                <button
                    onClick={() => props.folderaction()}
                    style={{ backgroundColor: '#60A5FA' }}
                >
                    <Icon className={styles.icon} icon="fe:folder" color='#FFFFFF' />
                </button>
                <p>Folder</p>
            </div>
        </div>
    )
}