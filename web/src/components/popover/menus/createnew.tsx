import { Icon } from '@iconify/react';
import { PopoverProps } from '../popover'

interface ButtonInfo {
    text: string;
    icon: string;
}

interface ButtonProps {
    info: ButtonInfo;

    onClick: () => void;
}

export default function PopoverCreateNew(props: PopoverProps) {
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
            {buttons.map((buttonData, i) => (
                <Button
                    info={buttonData}
                    onClick={() => {
                        props.inputCallback(buttonData.text.toLowerCase())
                        props.closeCallback();
                    }}
                    key={i}
                />
            ))}
        </>
    )
}


function Button(props: ButtonProps) {
    return (
        <div className='popovermenu-createnew' onClick={props.onClick}>
            <Icon
                icon={props.info.icon}
                color='#FFFFFF'
                className='popoverbutton-icon'
            />

            <p className='popoverbutton-text'> {props.info.text} </p>
        </div>
    );
}