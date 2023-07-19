import { Icon } from '@iconify/react';
import NewFolderMenu from './menus/newItem/newFolderMenu';
import CreateNewMenu from './menus/createNewMenu';
import NewNoteMenu from './menus/newItem/newNoteMenu';
import styles from './popup.module.css';
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
            popupBody = <NewNoteMenu closePopup={ () => {
                popupState.setEnabled(false);
             } } />

            break;
    
        default:
            popupBody = <NewFolderMenu closePopup={ () => {
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