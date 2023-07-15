import { NavItemProps } from '../../interfaces';
import { Icon } from '@iconify/react';
import './nav.css'
import { Link, useLocation } from 'react-router-dom';
import Popover from '../popover/popover';
import { useState } from 'react';

export default function Note(props: NavItemProps) {
    const location = useLocation()

    const [showOptions, setShowOptions] = useState(false)

    return (
        <Link to={`/note/${props.uuid}`} className='navitem-link'>
            <div className={'navitem ' + (location.pathname === `/note/${props.uuid}` ? 'navitem-active' : '')}>
                <div className='navitem-content'>
                    <Icon icon="fe:book" color="#FFFFFF" />
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
        </Link>
    );
}