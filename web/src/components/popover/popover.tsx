import { Icon } from '@iconify/react';

import './popover.css';

interface PopoverProps {
    title: string;
    
    buttonCallback: (_v: string) => void;
    closeCallback: () => void;
}

interface ButtonProps {
    text: string;
    icon: string;

    onClick: () => void;
}

export default function Popover(props: PopoverProps) {
    const buttons: ButtonProps[] = [
        {
            text: 'Header',
            icon: 'placeholder'
        },
        {
            text: 'Text',
            icon: 'placeholder'
        },
        {
            text: 'Image',
            icon: 'placeholder'
        },
    ]

    return (
        <div class='popover-main'>
            <p className='popover-title'>Add block</p>

            <div className='popover-section'>
                    {buttons.map((buttonData, _) => (
                        <Button
                            text={buttonData.text}
                            icon={buttonData.icon}
                            onClick={() => {
                                props.buttonCallback(buttonData.text.toLowerCase())
                                props.closeCallback();
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}

function Button(props: ButtonProps) {
    return (
        <div className='popoverbutton-main' onClick={props.onClick}>
            <Icon
                icon='fe:close'
                color='#FFFFFF'
                className='popoverbutton-icon'
            />

            <p className='popoverbutton-text'> {props.text} </p>
        </div>
    );
}