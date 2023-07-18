import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../lib/interfaces';
import Note from './navnote';
import Folder from './navfolder';
import { usePopupContext } from '../popup/popupcontext';
import { useNavigationContext } from './navcontext';
import { deleteItem, getItemsByFolder, updateItem } from '../../lib/api';
import LoadingSpinner from '../util/LoadingSpinner';

import styles from "./nav.module.css";

export default function NavBar() {
    const popupState = usePopupContext();
    const navState = useNavigationContext();

    const [loadingNotes, setLoadingNotes] = useState<boolean>(false);
    const [items, setItems] = useState<NavItemProps[]>([]);
    
    function loadNotes() {
        setLoadingNotes(true);
    
        getItemsByFolder(navState.path.map(path => path.uuid)) // only get the UUIDs, names are irrelevant
        .then((data) => {
            setItems(
                data.map(item => ({ type: item.type, title: item.title, uuid: item.uuid } as NavItemProps))
            )
        })
        .finally(() => setLoadingNotes(false));
    }

    useEffect(loadNotes, [navState.path]); // make loadnotes run when path changed

    function navigateFolder(uuid: string, title: string) {
        navState.setPath([...navState.path, {title: title, uuid: uuid}]);
    }

    function navigateBack() {
        navState.setPath(navState.path.slice(0, -1));
    }

    function handleClick() {
        popupState.setEnabled(true);
        popupState.setTitle('Create...');
        popupState.setType('createNew');
        popupState.setStateCallback(() => loadNotes)
    }

    function setTitle(uuid: string, title: string) {
        updateItem(uuid, title, navState.path.map(path => path.uuid))
        setItems(
            items.map((item, _) => {
                return (item.uuid === uuid ? {...item, title: title} : item)
            })
        )
    }

    async function removeItem(uuid: string) {
        await deleteItem(uuid)
        setItems(
            items.filter(item => {
                return item.uuid !== uuid
            })
        )
        // navigate('/')
    }

    function updateHeader() {
        let pathString: string = '/';
        navState.path.forEach((item) => {
            pathString += item.title + '/';
        })

        if (pathString.length > 16) {
            pathString = pathString.slice(-16);
            pathString = '...' + pathString;
        }

        return pathString;
    }

    return (
        <div className={styles.nav}>
            <div className={styles.navHeader}>
                {navState.path.length > 0 && 
                    <Icon icon='fe:arrow-left' className={styles.navHeaderButton} onClick={navigateBack} color='#FFFFFF'/>
                }
                <p className={styles.navHeaderTitle}>{updateHeader()}</p>
                <Icon icon="fe:plus" className={styles.navHeaderButton} onClick={handleClick} color="#FFFFFF" style={{marginLeft: 'auto'}}/>
            </div>

            <div className={styles.navList}>
                { loadingNotes ? <LoadingSpinner /> :
                    items.length == 0 ? <p className={styles.notice}><Icon icon="fe:warning" /> Add a note to begin.</p> :
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