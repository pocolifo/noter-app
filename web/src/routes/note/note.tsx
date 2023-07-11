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


export default function Note() {
    let { id } = useParams();

    const [loadingNote, setLoadingNote] = useState<boolean>(false);
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [title, setTitle] = useState<string>('');
    const [popoverState, setPopoverState] = useState(false);

    useEffect(() => {
        document.title = `${title} | Noter`
    }, [title])

    function addBlock(blockType: string, data?: object) {
        let newBlock: ContentBlock = {
            type: blockType,
            data: (data ? data : {})
        };

        blockType === 'text' ? newBlock.data.focus = true : null

        setBlocks([...blocks, newBlock]);
    }

    function saveBlock(content: object, index: number) {
        setBlocks(blocks.map((block, i) => {
            return (i === index ? { type: block.type, data: content } : block)
        }))
    }

    function togglePopover() {
        setPopoverState(!popoverState);
    }

    useEffect(() => {
        setLoadingNote(true);
        getNoteByUUID(id as string)
            .then((data) => {
                setBlocks(data.content)
                setTitle(data.title)
            }).finally(() => setLoadingNote(false));
    }, [id])

    const firstUpdate = useRef(true)

    useEffect(() => {
        if (!firstUpdate.current) {
            saveNote({
                title: title,
                uuid: id as string,
                content: blocks
            })
        }
        firstUpdate.current = false
    }, [blocks])

    return (
        <div>
            {loadingNote ? <LoadingSpinner /> :
                <>
                    <div className='noteheader'>
                        <p className='noteheader-title'>{title}</p>
                    </div>

                    <div className='notebody'>
                        {blocks && blocks.map((blockData, i) => {
                            switch (blockData.type) {
                                case 'header':
                                    return <HeaderBlock
                                        save={(content) => saveBlock(content, i)}
                                        text={blockData.data.content}
                                        key={i}
                                    />

                                case 'text':
                                    return <TextBlock
                                        save={(content) => saveBlock(content, i)}
                                        text={blockData.data.content}
                                        focus={blockData.data.focus}
                                        key={i}
                                    />

                                case 'image':
                                    return <ImageBlock
                                        save={(content) => saveBlock(content, i)}
                                        src={blockData.data.src}
                                        alt={blockData.data.alt}
                                        key={i}
                                    />
                            }
                        })}
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
                        buttonCallback={() => {}}
                        closeCallback={() => {
                            setPopoverState(false);
                        }} />}
                </>
            }
        </div>
    );
}