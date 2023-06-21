import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';

import './popup.css'

//import { PopupContext } from '../../routes/app/App'
//import { PopupProps } from '../../interfaces';`

import { usePopupContext } from './popupcontext';

export default function Popup() {
    // const popupContext = useContext(PopupContext) as PopupProps;
    // const [popupState, setPopupState] = useState(popupContext);

    const popupState = usePopupContext();

    if (!popupState.enabled) {
        return null;
    }

    function handleKeyPress(event: any) {
        if (event.key == 'Enter') {
            const input = (document.getElementById('popup-input') as HTMLInputElement).value; // casting hack
            
            //props.state(input);

            // popupState.stateCallback(input);
            popupState.stateCallback(input);
        } else if (event.key == 'Escape') {

        }
    }

    
    // note: the input is currently just a temporary placeholder
    // popup state will eventually be controlled by a contextprovider so that it can be modified globally

    return (
        <div>
            <div className='popup-overlay'/>
            <div className='popup-main'> 
                
                <div className='popup-header'>
                    <p className='popup-title'> {'test'} </p>

                    <Icon icon="fe:close" color="#FFFFFF" className='popup-close' onClick={() => {
                        // props.closeCallback(false) // anonymous function so it doesn't call before clicked
                        
                        // setPopupState((prevState) => ({
                        //     ...prevState,
                        //     enabled: false
                        // }));

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