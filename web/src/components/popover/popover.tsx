import { Icon } from '@iconify/react';

import './popover.css';

interface PopoverProps {
    title: string;
    
    buttonCallback: (_v: string) => void;
    closeCallback: () => void;
}

interface ButtonInfo {
    text: string;
    icon: string;
}

interface ButtonProps {
    info: ButtonInfo;

    onClick: () => void;
}

export default function Popover(props: PopoverProps) {
    const buttons: ButtonInfo[] = [
        {
            text: 'Header',
            icon: 'fe:text-size'
        },
        {
            text: 'Text',
            icon: 'fe:text-align-left'
        },
        {
            text: 'Image',
            icon: 'fe:picture'
        },
    ]

    return (
        <>
            <div className='popover-overlay' onClick={props.closeCallback} />
            <div className='popover-main'>
                <p className='popover-title'> {props.title} </p>

                <div className='popover-section'>
                        {buttons.map((buttonData, i) => (
                            <Button
                                info={buttonData}
                                onClick={() => {
                                    props.buttonCallback(buttonData.text.toLowerCase())
                                    props.closeCallback();
                                }}
                                key={i}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}

function Button(props: ButtonProps) {
    return (
        <div className='popoverbutton-main' onClick={props.onClick}>
            <Icon
                icon={props.info.icon}
                color='#FFFFFF'
                className='popoverbutton-icon'
            />

            <p className='popoverbutton-text'> {props.info.text} </p>
        </div>
    );
}