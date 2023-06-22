import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import NavItem from './navitem';
import { usePopupContext } from '../popup/popupcontext';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps){
    const popupState = usePopupContext();

    const [name, setName] = useState("New item");
    const [items, setItems] = useState<NavItemProps[]>([]);

    useEffect(() => {
        if (popupState.enabled) {
            addItem();
        }
    }, [name]);

    function addItem() {
        popupState.setEnabled(false);
        
        const newItemProps: NavItemProps = {
            title: name
        }; 

        setItems([...items, newItemProps]);
    }

    function handleClick() {
        popupState.setEnabled(true);
        popupState.setTitle('Item title');
        popupState.setStateCallback(() => setName);
    }

    return (
        <div className='nav'>
            <div className='navheader'>
                <p className='navheader-title'> {props.header} </p>
                <Icon icon="fe:plus" className='navheader-button' onClick={handleClick} color="#FFFFFF" />
            </div>

            <div className='nav-list'>
                {items.map((item, _) => (
                    <NavItem title={item.title}/>
                ))}
            </div>
        </div>
    );
}