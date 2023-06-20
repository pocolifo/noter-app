import { Icon } from '@iconify/react';
import './createblock.css'

interface CreateBlockProps {
    clickhandler: Function,
    drophandler: (media: File) => void
}

export default function CreateBlock(props: CreateBlockProps) {
    return (
        <div id="createblock">
            <span>
                <Icon icon="fe:plus" color="#202123"></Icon>
                New block or drop media
            </span>
        </div>
    )
}