import { Icon } from '@iconify/react';
import './createblock.css'
import { useState } from 'react';

interface CreateBlockProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    onDrop: React.DragEventHandler<HTMLButtonElement>
}

export default function CreateBlock(props: CreateBlockProps) {
    const [droppedStyle, setDroppedStyle] = useState(false)

    return (
        <button 
            id="createblock"
            onDragLeave={() => {setDroppedStyle(false)}}
            onDragOver={() => {setDroppedStyle(true)}}
            className={droppedStyle ? 'draggedover' : ''}
            onClick={props.onClick}
            onDrop={props.onDrop}
        >
            <span>
                <Icon icon="fe:plus" color="#202123"></Icon>
                New block or drop media
            </span>
        </button>
    )
}