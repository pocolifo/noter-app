import { Icon } from '@iconify/react';

import './popover.css';

interface PopoverProps {
    title: string;
}

export default function Popover(props: PopoverProps) {
    return (
        <div class='popover-main'>
            <p className='popover-title'>Add block</p>

            <div className='popover-section'>

            </div>
        </div>
    );
}

function Button() {
    return (
        <div className='popoverbutton-main'>

        </div>
    );
}