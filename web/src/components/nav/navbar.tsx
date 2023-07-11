import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import NavItem from './navitem';
import { usePopupContext } from '../popup/popupcontext';
import { getNotesByFolder } from '../../api';
import LoadingSpinner from '../util/LoadingSpinner';


interface NavBarProps {
    header: string;
}


export default function NavBar(props: NavBarProps) {
    const popupState = usePopupContext();
    
    const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
    const [items, setItems] = useState<NavItemProps[]>([]);
    const [path, _] = useState<string[]>([]);
    
    function loadNotes() {
        setLoadingNotes(true);
    
        getNotesByFolder(path)
        .then((data) => {
                setItems(
                    data.map(item => ({ title: item.title, uuid: item.uuid } as NavItemProps))
                )
            })
        .finally(() => setLoadingNotes(false));
    }
    
    // goofy ass hack to only run once
    useEffect(loadNotes, [path]);

    function handleClick() {
        popupState.setEnabled(true);
        popupState.setTitle('Create...');
        popupState.setType('createNew');
        popupState.setStateCallback(() => loadNotes)
    }

    return (
        <div className='nav'>
            <div className='navheader'>
                <p className='navheader-title'> {props.header} </p>
                <Icon icon="fe:plus" className='navheader-button' onClick={handleClick} color="#FFFFFF" />
            </div>

            <div className='nav-list'>
                { loadingNotes ? <LoadingSpinner /> :
                    items.length == 0 ? <p className='notice'><Icon icon="fe:warning" /> Add a note to begin.</p> :
                    items.map((item, i) => (
                        <NavItem 
                            title={item.title} 
                            uuid={item.uuid} 
                            key={i} />
                    ))}
            </div>
        </div>
    );
}