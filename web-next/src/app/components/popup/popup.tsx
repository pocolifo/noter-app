import { Icon } from '@iconify/react';

import styles from './popup.module.css';

import CreateNewFolderMenu from './menus/createNewFolderMenu';
import CreateNewMenu from './menus/createNewMenu';
import CreateNewNoteMenu from './menus/createNewNoteMenu';
import { usePopupContext } from './popupcontext';

export default function Popup() {
    const popupState = usePopupContext();
    let popupBody: JSX.Element;

    switch (popupState.type) {
        case "createNew":
            popupBody = <CreateNewMenu
                studyguideaction={() => {
                    popupState.setTitle('Create Study Guide')
                    popupState.setType('createNewStudyguide')
                }}
                noteaction={() => {
                    popupState.setTitle('Create Note')
                    popupState.setType('createNewNote')
                }}
                folderaction={() => {
                    popupState.setTitle('Create Folder')
                    popupState.setType('createNewFolder')
                }}
            />
            break;

        case "createNewNote":
            popupBody = <CreateNewNoteMenu closePopup={ () => {
                popupState.setEnabled(false);
             } } />

            break;
    
        default:
            popupBody = <CreateNewFolderMenu closePopup={ () => {
                popupState.setEnabled(false);
            }}/>

            break;
    }

    return (
        <>
            { popupState.enabled && <div className={styles.popupOverlay} onClick={() => popupState.setEnabled(false)} /> }
            
            <div className={`${styles.popupMain} ${!popupState.enabled && styles.inactive}`}> 
                <div className={styles.popupHeader}>
                    <p className={styles.popupTitle}>{popupState.title}</p>

                    <Icon icon="fe:close" color="#FFFFFF" className={styles.popupClose} onClick={() => {
                        popupState.setEnabled(false);
                    }} />
                </div>
                
                {popupBody}
            </div>
        </>
    )
}