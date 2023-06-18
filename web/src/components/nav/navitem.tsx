import './nav.css'

import { NavItemProps } from '../../interfaces';

export default function NavItem(props: NavItemProps){
    return (
        <div className='navitem'>
            <img src='placeholder'></img>
            <p className='navitem-title'>{props.title}</p>
        </div>
    );
}