import { Icon } from '@iconify/react';
import { usePopupContext } from './popupcontext';
import './popup.css'


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
    
    // note: the input is currently just a temporary placeholder

    return (
        <div>
            <div className='popup-overlay'/>
            <div className='popup-main'> 
                
                <div className='popup-header'>
                    <p className='popup-title'> {popupState.title} </p>

                    <Icon icon="fe:close" color="#FFFFFF" className='popup-close' onClick={() => {
                        popupState.setEnabled(false);
                    }} />
                </div>

                <input
                    type="text"
                    className='popup-input'
                    id='popup-input'
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    )
}