import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { NavItemProps } from '../../lib/interfaces';
import Note from './navnote';
import Folder from './navfolder';
import { PopupProvider, usePopupContext } from '../popup/popupcontext';
import { useNavigationContext } from './navcontext';
import { deleteItem, getItemsByFolder, updateItem } from '../../lib/api';
import LoadingSpinner from '../util/LoadingSpinner';
import type { DraggableProvided, DraggableStateSnapshot, DropResult, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./nav.module.css";
import Link from 'next/link';

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
        navState.setPath([...navState.path, { title: title, uuid: uuid }]);
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
                return (item.uuid === uuid ? { ...item, title: title } : item)
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

    function onDragEnd(result: DropResult) {
        if (result.combine) {
            const sourceItem = items[result.source.index]
            const [destinationFolder] = items.filter(item => item.uuid === result.combine?.draggableId)

            let new_path = navState.path.map(path => path.uuid)
            new_path.push(destinationFolder.uuid)

            updateItem(sourceItem.uuid, sourceItem.title, new_path)

            setItems(items.filter(item => item.uuid !== sourceItem.uuid))

            return
        }

        if (!result.destination || result.source.index === result.destination.index) {
            return;
        }

        const updatedItems = Array.from(items);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(updatedItems);
    }

    return (
        <div className={styles.nav}>
            <div className={styles.navHeader}>
                {navState.path.length > 0 &&
                    <Icon icon='fe:arrow-left' className={styles.navHeaderButton} onClick={navigateBack} color='#FFFFFF' />
                }
                <p className={styles.navHeaderTitle}>{updateHeader()}</p>
                <Icon icon="fe:plus" className={styles.navHeaderButton} onClick={handleClick} color="#FFFFFF" style={{ marginLeft: 'auto' }} />
            </div>

            <div className={styles.navList}>
                {loadingNotes ? <LoadingSpinner /> :
                    items.length == 0 ? <p className={styles.notice}><Icon icon="fe:warning" /> Add a note to begin.</p> :
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId='navbarDroppable' isCombineEnabled>
                                {(provided: DroppableProvided, parentSnapshot: DroppableStateSnapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {items.map((item, i) => (
                                            <Draggable key={item.uuid} draggableId={item.uuid} index={i}>
                                                {(provided: DraggableProvided, childSnapshot: DraggableStateSnapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {(() => {
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
                                                                            highlight={childSnapshot.combineTargetFor === parentSnapshot.draggingFromThisWith && parentSnapshot.isDraggingOver}
                                                                        />

                                                                default:
                                                                    return <></>
                                                            }
                                                        })()}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                }
            </div>

            <div className={styles.navFooter}>
                <hr/>

                <div className={styles.navFooterContent}>
                    <Link href={'/settings/profile'} className={styles.navItemLink}>
                        <Icon
                            icon='clarity:settings-line'
                            className={styles.navHeaderButton}
                            color='#FFFFFF'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}