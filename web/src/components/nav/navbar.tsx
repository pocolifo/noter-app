import './nav.css';

import { useState, useEffect } from 'react';

import { NavItemProps } from '../../interfaces';
import NavItem from './navitem';
import Popup from '../popup/popup';

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
                <div
                    className='navheader-button'
                    onClick={togglePopup}
                />
            </div>

            <div className='nav-list'>
                {items.map((item, i) => (
                    <NavItem title={item.title}/>
                ))}
            </div>
        </div>
    );
}