import { NavItemProps } from '../../interfaces';
import { Icon } from '@iconify/react';
import './nav.css'


export default function NavItem(props: NavItemProps){
    return (
        <div className='navitem'>
            <Icon icon="fe:book" color="#FFFFFF" />
            <p className='navitem-title'>{props.title}</p>
        </div>
    );
}