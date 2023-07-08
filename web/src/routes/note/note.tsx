import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './note.css';

import { ContentBlock } from '../../interfaces';
import Popover from '../../components/popover/popover';
import CreateBlock from '../../components/note/createblock/createblock';
import HeaderBlock from '../../components/note/contentblock/headerblock';
import ImageBlock from '../../components/note/contentblock/imageblock';
import TextBlock from '../../components/note/contentblock/textblock';
import { getNoteByUUID, saveNote } from '../../api';

export default function Note() {
    let { id } = useParams();

    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [title, setTitle] = useState<string>('');
    const [popoverState, setPopoverState] = useState(false);

    useEffect(() => {
        document.title = `Noter - ${title}`
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
        getNoteByUUID(id as string)
            .then((data) => {
                setBlocks(data.content)
                setTitle(data.title)
            })
    }, [id])

    useEffect(() => {
        saveNote({
            title: title,
            uuid: id as string,
            content: blocks
        })
    }, [blocks])

    return (
        <div>
            <div className='noteheader'>
                <p className='noteheader-title'>{title}</p>
            </div>

            <div className='notebody'>
                {blocks.map((blockData, i) => {
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
                buttonCallback={addBlock}
                closeCallback={() => {
                    setPopoverState(false);
                }}
            />}
        </div>
    );
}