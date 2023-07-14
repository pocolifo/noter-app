import { Icon } from '@iconify/react';
import './nav.css'
import { useLocation } from 'react-router-dom';
import Popover from '../popover/popover';
import { useState } from 'react';

export interface FolderProps {
    title: string;
    uuid: string;

    navigateFolder: () => void;
    setTitle: (title: string) => void;
    delete: () => void;
}

export default function Folder(props: FolderProps) {
    const location = useLocation()

    const [showOptions, setShowOptions] = useState(false)

    return (
        <div className='navitem' onClick={() => {
            props.navigateFolder(props.title); // todo: make folder navigate by uuid instead of name
        }}>
            <div className='navitem-content'>
                <Icon icon="fe:folder" color="#FFFFFF" />
                <p className='navitem-title'>{props.title}</p>

                <Icon 
                    className='navitem-options' 
                    icon="fe:elipsis-v" 
                    color="#FFFFFF"
                    onClick={() => setShowOptions(true)}
                />
            </div>

            {showOptions && 
                <Popover 
                    title='Actions'
                    menu='EditItem'
                    align='left'
                    inputCallback={props.setTitle}
                    buttonCallback={props.delete}
                    closeCallback={() => setShowOptions(false)}
                />
            }
        </div>
    );
}