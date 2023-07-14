import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import NavItem from './navitem';
import { usePopupContext } from '../popup/popupcontext';
import { deleteItem, getNotesByFolder, updateItem } from '../../api';
import LoadingSpinner from '../util/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps) {
    const popupState = usePopupContext();
    const navigate = useNavigate()
    
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

    function setTitle(uuid: string, title: string) {
        updateItem(uuid, title, []) // TODO: fix temporary pathname
        setItems(
            items.map((item, _) => {
                return (item.uuid === uuid ? {...item, title: title} : item)
            })
        )
        navigate(`/`)
    }

    function removeItem(uuid: string) {
        deleteItem(uuid)
        setItems(
            items.filter((item, _) => {
                item.uuid !== uuid
            })
        )
        navigate('/') //TODO: why is this not working?
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
                            key={i} 
                            setTitle={(title) => setTitle(item.uuid, title)}
                            delete={() => removeItem(item.uuid)}
                            />
                    ))}
            </div>
        </div>
    );
}