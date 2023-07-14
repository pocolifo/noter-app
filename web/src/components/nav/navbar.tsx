import './nav.css';

import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../interfaces';
import Note from './navnote';
import Folder from './navfolder';
import { usePopupContext } from '../popup/popupcontext';
import { useNavigationContext } from './navcontext';
import { deleteItem, getItemsByFolder, updateItem } from '../../api';
import LoadingSpinner from '../util/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    header: string;
}

export default function NavBar(props: NavBarProps) {
    const popupState = usePopupContext();
    const navState = useNavigationContext();

    const navigate = useNavigate()
    
    const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
    const [items, setItems] = useState<NavItemProps[]>([]);
    //const [path, setPath] = useState<string[]>([]);
    
    function loadNotes() {
        setLoadingNotes(true);
    
        console.log(navState.path);

        getItemsByFolder(navState.path)
        .then((data) => {
                setItems(
                    data.map(item => ({ type: item.type, title: item.title, uuid: item.uuid } as NavItemProps))
                )
            })
        .finally(() => setLoadingNotes(false));
    }
    
    // goofy ass hack to only run once
    useEffect(loadNotes, [navState.path]); // make loadnotes run when path changed

    function navigateFolder(uuid: string) {
        //setPath([...path, uuid]);\
        navState.setPath([...navState.path, uuid]);

        console.log('hi');
    }

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
                    items.map((item, i) => {
                        switch (item.type) {
                            case 'note':
                                return <Note
                                    type={item.type}
                                    title={item.title}
                                    uuid={item.uuid}
                                    key={i}
                                    setTitle={(title) => setTitle(item.uuid, title)}
                                    delete={() => removeItem(item.uuid)}
                                />
                            case 'folder':
                                return <Folder
                                    title={item.title}
                                    uuid={item.uuid}
                                    key={i}
                                    navigateFolder={navigateFolder}
                                    setTitle={(title) => setTitle(item.uuid, title)}
                                    delete={() => removeItem(item.uuid)}
                                />
                            default:
                                return <></>
                        }
                    })}
            </div>
        </div>
    );
}