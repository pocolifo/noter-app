import './nav.css';

import { useContext, useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps, PopupProps } from '../../interfaces';
//import { PopupContext } from '../../routes/app/App';
import NavItem from './navitem';

import { usePopupContext } from '../popup/popupcontext';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps){
    //const [popupState, setPopupState] = useState(false);

    //const [popupState, setPopupState] = useState<PopupProps>(PopupContext);

    // const popupContext = useContext(PopupContext) as PopupProps;
    // const [popupState, setPopupState] = useState(popupContext);

    const popupState = usePopupContext();

    const [name, setName] = useState("New item");
    const [items, setItems] = useState<NavItemProps[]>([]);

    useEffect(() => {
        if (popupState.enabled) {
            addItem();
            console.log("hello");
        }
    }, [name]);

    function addItem() {
        // setPopupState((prevState) => ({
        //     ...prevState,
        //     enabled: false
        // }));

        popupState.setEnabled(false);
        
        const newItemProps: NavItemProps = {
            title: name
        }; 

        setItems([...items, newItemProps]);
    }

    function handleClick() {
        console.log('cliocked');

        // const newPopupState = {
        //     enabled: true,
        //     title: 'Item title',

        //     stateCallback: setName
        // };

        // setPopupState(newPopupState);

        popupState.setEnabled(true);
        popupState.setStateCallback(setName);
    }

    return (
        <div className='nav'>
            {/* {popupState && <Popup
                title={'Item title'}
                closeCallback={togglePopup}
                state={setName}
            />} */}

            <div className='navheader'>
                <p className='navheader-title'> {props.header} </p>
                <Icon icon="fe:plus" className='navheader-button' onClick={handleClick} color="#FFFFFF" />
            </div>

            <div className='nav-list'>
                {items.map((item, i) => (
                    <NavItem title={item.title}/>
                ))}
            </div>
        </div>
    );
}