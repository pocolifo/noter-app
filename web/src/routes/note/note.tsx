import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import './note.css';

import { ContentBlock } from '../../interfaces';
import Popover from '../../components/popover/popover';
import CreateBlock from '../../components/note/createblock/createblock';
import HeaderBlock from '../../components/note/contentblock/headerblock';
import ImageBlock from '../../components/note/contentblock/imageblock';
import TextBlock from '../../components/note/contentblock/textblock';
import { getNoteByUUID, saveNote } from '../../api';
import LoadingSpinner from '../../components/util/LoadingSpinner';
import { Icon } from "@iconify/react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot, DropResult } from 'react-beautiful-dnd';

export default function Note() {
    let { id } = useParams();

    const [loadingNote, setLoadingNote] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [title, setTitle] = useState<string>('');
    const [popoverState, setPopoverState] = useState(false);
    const [currentHover, setCurrentHover] = useState<string>('')
    const [loadError, setLoadError] = useState<string>('')

    useEffect(() => {
        document.title = `${title} | Noter`
    }, [title, id])

    function addBlock(blockType: string, data?: object) {
        let newBlock: ContentBlock = {
            type: blockType,
            uuid: (Math.random() * 100).toString(16), // TODO: MAKE PROPER BACKEND IMPLEMENTATION FOR THIS
            data: (data ? data : {})
        };

        blockType === 'text' ? newBlock.data.focus = true : null

        setBlocks([...blocks, newBlock]);
    }

    function saveBlock(content: object, uuid: string) {
        setBlocks(blocks.map((block, _) => {
            return (block.uuid === uuid ? { ...block, data: content } : block)
        }))
    }

    function togglePopover() {
        setPopoverState(!popoverState);
    }

    useEffect(() => {
        setLoadingNote(true);
        getNoteByUUID(id as string)
            .then((data) => {
                for (let block of data.content) {
                    block.uuid = (Math.random() * 100).toString(16)
                }
                setBlocks(data.content)
                setTitle(data.title)
            })
            .catch(error => {
                setLoadError(error as string)
            })
            .finally(() => setLoadingNote(false));
    }, [id])

    const firstUpdate = useRef(true)

    useEffect(() => {
        if (!firstUpdate.current) {
            saveNote({
                title: title,
                type: 'note',
                uuid: id as string,
                content: blocks
            })
        }
        firstUpdate.current = false
    }, [blocks])

    function onDragEnd(result: DropResult) {
        if (!result.destination || result.source.index === result.destination.index) {
            return;
        }

        const updatedBlocks = Array.from(blocks);
        const [reorderedBlock] = updatedBlocks.splice(result.source.index, 1);
        updatedBlocks.splice(result.destination.index, 0, reorderedBlock);

        setBlocks(updatedBlocks);
    }

    function getBlockComponent(blockData: ContentBlock) {
        switch (blockData.type) {
            case 'header':
                return <HeaderBlock
                    save={(content) => saveBlock(content, blockData.uuid)}
                    text={blockData.data.content}
                />

            case 'text':
                return <TextBlock
                    save={(content) => saveBlock(content, blockData.uuid)}
                    text={blockData.data.content}
                    focus={blockData.data.focus}
                />

            case 'image':
                return <ImageBlock
                    save={(content) => saveBlock(content, blockData.uuid)}
                    src={blockData.data.src}
                    alt={blockData.data.alt}
                />

            default:
                return <div></div>
        }
    }

    return (
        <div>
            {loadingNote ? <LoadingSpinner /> :
                <>
                    {loadError !== '' ?
                        <p>404 not found</p> :
                        <>
                            <div className='noteheader'>
                                <p className='noteheader-title'>{title}</p>
                            </div>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className='notebody'>
                                    <Droppable droppableId='droppable'>
                                        {(provided: DroppableProvided, _: DroppableStateSnapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {blocks.map((blockData, i) => (
                                                    <Draggable key={blockData.uuid} draggableId={blockData.uuid} index={i} >
                                                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                            <div
                                                                className={`note-block ${snapshot.isDragging && 'dragging'}`}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                onMouseOver={() => setCurrentHover(blockData.uuid)}
                                                            >
                                                                <div {...provided.dragHandleProps}>
                                                                    <Icon
                                                                        color='grey'
                                                                        icon='material-symbols:drag-indicator'
                                                                        className={`drag-icon ${currentHover && 'hovering'}`}
                                                                    />
                                                                </div>

                                                                {getBlockComponent(blockData)}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}

                                                {/* 
                                          * The placeholder fixes the dimensions of the container when an item is being dragged.
                                          * See https://github.com/atlassian/react-beautiful-dnd/issues/462
                                          */}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>

                                <CreateBlock onDrop={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                    let src = ''
                                    let [file] = e.dataTransfer.files
                                    let reader = new FileReader()
                                    reader.onload = () => {
                                        src = (reader.result as string)
                                    }
                                    if (file) {
                                        reader.readAsDataURL(file)
                                    }
                                    addBlock("image", { src: src })
                                }} onClick={togglePopover} />

                                {popoverState && <Popover
                                    title='Add block'
                                    menu='CreateNew'
                                    align='top'
                                    inputCallback={addBlock}
                                    buttonCallback={() => { }}
                                    closeCallback={() => setPopoverState(false)} />}
                            </DragDropContext>
                        </>
                    }
                </>
            }
        </div>
    );
}