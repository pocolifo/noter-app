import { Icon } from '@iconify/react';

import './popup.css';

import CreateNewMenu from './menus/createNewMenu';
import CreateNewNoteMenu from './menus/createNewNoteMenu';
import { usePopupContext } from './popupcontext';

export default function Popup() {
    const popupState = usePopupContext();

    if (!popupState.enabled) {
        return null;
    }

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
            popupBody = <CreateNewNoteMenu onsubmit={(value) => {
                popupState.stateCallback(value)
            }}/>
            break;
    
        default:
            popupBody = <div>in progress</div>

            break;
    }

    return (
        <>
            { popupState.enabled && <div className='popup-overlay' onClick={() => popupState.setEnabled(false)} /> }
            
            <div className={'popup-main ' + (!popupState.enabled ? 'inactive' : '') }> 
                <div className='popup-header'>
                    <p className='popup-title'>{popupState.title}</p>

                    <Icon icon="fe:close" color="#FFFFFF" className='popup-close' onClick={() => {
                        popupState.setEnabled(false);
                    }} />
                </div>
                
                {popupBody}
            </div>
        </>
    )
}