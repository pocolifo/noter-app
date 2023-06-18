import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import Popup from '../popup/popup';
import NavItem from './navitem';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps){
    const [popupState, setPopupState] = useState(false);
    const [name, setName] = useState("New item");
    const [items, setItems] = useState<NavItemProps[]>([]);

    useEffect(() => {
        if (popupState) {
            addItem();
            console.log("hello");
        }
    }, [name]);

    function addItem() {
        togglePopup();
        
        const newItemProps: NavItemProps = {
            title: name
        }; 

        setItems([...items, newItemProps]);
    }

    function togglePopup() {
        setPopupState(!popupState);
    }

    return (
        <div className='nav'>
            {popupState && <Popup
                title={'Item title'}
                closeCallback={togglePopup}
                state={setName}
            />}

            <div className='navheader'>
                <p className='navheader-title'> {props.header} </p>
                <Icon icon="fe:plus" className='navheader-button' onClick={togglePopup} color="#FFFFFF" />
            </div>

            <div className='nav-list'>
                {items.map((item, i) => (
                    <NavItem title={item.title}/>
                ))}
            </div>
        </div>
    );
}