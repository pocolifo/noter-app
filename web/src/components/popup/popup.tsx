import { Icon } from '@iconify/react';

import './popup.css';

import { usePopupContext } from './popupcontext';

export default function Popup() {
    const popupState = usePopupContext();

    if (!popupState.enabled) {
        return null;
    }

    function handleKeyPress(event: any) {
        if (event.key == 'Enter') {
            const input = (document.getElementById('popup-input') as HTMLInputElement).value; // casting hack
            
            popupState.stateCallback(input);
        } else if (event.key == 'Escape') {
            popupState.setEnabled(false);
        }
    }
    
    let popupBody: JSX.Element;

    switch (popupState.type) {
        case "createNew":
            popupBody = <div className="create-new">
                <div>
                    <button onClick={() => {
                        popupState.setTitle('Create Study Guide')
                        popupState.setType('createNewStudyguide')
                    }} style={{backgroundColor: '#F472B6'}}>
                        <Icon icon="fe:document" color='#FFFFFF'/>
                    </button>
                    <p>Study Guide</p>
                </div>

                <div>
                    <button onClick={() => {
                        popupState.setTitle('Create Note')
                        popupState.setType('createNewNote')
                    }} style={{backgroundColor: '#C084FC'}}>
                        <Icon icon="fe:book" color='#FFFFFF'/>
                    </button>
                    <p>Note</p>
                </div>

                <div>
                    <button onClick={() => {
                        popupState.setTitle('Create Folder')
                        popupState.setType('createNewFolder')
                    }} style={{backgroundColor: '#60A5FA'}}>
                        <Icon icon="fe:folder" color='#FFFFFF'/>
                    </button>
                    <p>Folder</p>
                </div>
            </div>
            break;

        case "createNewNote":
            popupBody = <div className='createNewNote'>
                <p>NAME</p>
               <input
                    type="text"
                    className='popup-input'
                    id='popup-input'
                    onKeyDown={handleKeyPress}
                /> 
                <button onClick={() => {
                    popupState.stateCallback((document.getElementById('popup-input') as HTMLInputElement).value)
                }}>
                    Create
                </button>
            </div>

            break;
    
        default:
            popupBody = <div></div>

            break;
    }

    return (
        <>
            <div className='popup-overlay' onClick={() => popupState.setEnabled(false)}/>
            <div className='popup-main'> 
                
                <div className='popup-header'>
                    <p className='popup-title'> {popupState.title} </p>

                    <Icon icon="fe:close" color="#FFFFFF" className='popup-close' onClick={() => {
                        popupState.setEnabled(false);
                    }} />
                </div>
                
                {popupBody}
            </div>
        </>
    )
}