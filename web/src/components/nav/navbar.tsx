import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import NavItem from './navitem';
import { usePopupContext } from '../popup/popupcontext';
import { createNote, getNotesByFolder } from '../../api';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps) {
    const popupState = usePopupContext();

    const [name, setName] = useState("New item");
    const [items, setItems] = useState<NavItemProps[]>([]);
    const [path, setPath] = useState<string[]>([]);

    // goofy ass hack to only run once
    useEffect(() => {
        getNotesByFolder(path)
        .then((data) => {
                let tempitems = [] as NavItemProps[]
                data.forEach(note => {
                    tempitems.push({ title: note.title, uuid: note.uuid })
                })
                setItems(tempitems)
            })
        
    }, [path]);

    useEffect(() => {
        if (popupState.enabled) {
            addItem();
        }
    }, [name]);

    function addItem() {
        popupState.setEnabled(false);

        // TODO: CHANGE THE PATH
        let newItemProps = {} as NavItemProps

        createNote(name, path).then(data => {
            newItemProps.title = data.title
            newItemProps.uuid = data.uuid

            setItems([...items, newItemProps]);
        });
    }

    function handleClick() {
        popupState.setEnabled(true);
        popupState.setTitle('Create...');
        popupState.setType('createNew');
        popupState.setStateCallback(() => setName);
    }

    return (
        <div className='nav'>
            <div className='navheader'>
                <p className='navheader-title'> {props.header} </p>
                <Icon icon="fe:plus" className='navheader-button' onClick={handleClick} color="#FFFFFF" />
            </div>

            <div className='nav-list'>
                {items.map((item, i) => (
                    <NavItem title={item.title} uuid={item.uuid} key={i} />
                ))}
            </div>
        </div>
    );
}