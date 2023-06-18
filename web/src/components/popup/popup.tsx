import { Icon } from '@iconify/react';
import './popup.css'

interface PopupProps {
    title: string;
    // have to pass in togglePopup into self, can be mitigated using contextprovider
    closeCallback(v: boolean): void;
    state(v: any): void;
}

export default function Popup(props: PopupProps) {
    function handleKeyPress(event: any) {
        if (event.key == 'Enter') {
            const input = (document.getElementById('popup-input') as HTMLInputElement).value; // casting hack

            props.state(input);
        }
    }

    // note: the input is currently just a temporary placeholder
    // popup state will eventually be controlled by a contextprovider so that it can be modified globally

    return (
        <div>
            <div className='popup-overlay'/>
            <div className='popup-main'> 
                
                <div className='popup-header'>
                    <p className='popup-title'> {props.title} </p>

                    <Icon icon="fe:close" color="#FFFFFF" className='popup-close' onClick={() => {
                        props.closeCallback(false) // anonymous function so it doesn't call before clicked
                    }} />
                </div>

                <input
                    type="text"
                    className='popup-input'
                    id='popup-input'
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}