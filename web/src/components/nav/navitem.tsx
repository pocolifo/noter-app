import { NavItemProps } from '../../interfaces';
import { Icon } from '@iconify/react';
import './nav.css'
import { Link, useLocation } from 'react-router-dom';


export default function NavItem(props: NavItemProps) {
    const location = useLocation()

    return (
        <Link to={`/note/${props.uuid}`}>
            <div className={'navitem ' + (location.pathname === `/note/${props.uuid}` ? 'navitem-active' : '')}>
                <Icon icon="fe:book" color="#FFFFFF" />
                <p className='navitem-title'>{props.title}</p>
            </div>
        </Link>
    );
}