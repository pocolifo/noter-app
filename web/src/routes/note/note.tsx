import { useState } from 'react';

import './note.css';

import { NoteData, ContentBlock } from '../../interfaces';
import Popover from '../../components/popover/popover';
import CreateBlock from '../../components/note/createblock/createblock';
import HeaderBlock from '../../components/note/contentblock/headerblock';
import ImageBlock from '../../components/note/contentblock/imageblock';
import TextBlock from '../../components/note/contentblock/textblock';

export default function Note(props: NoteData) {
    const tempData: NoteData = { // temporary props, same format as normal props
        title: 'Sample page',
        content: [
            {
                type: 'header',
                data: {
                    text: 'this is a header'
                }
            },
            {
                type: 'text',
                data: {
                    text: 'this is a block of text'
                }
            }
        ]
    };

    const [blocks, setBlocks] = useState<ContentBlock[]>(tempData.content); //props.content
    const [popoverState, setPopoverState] = useState(false);

    function addBlock(blockType: string) {
        const newBlock: ContentBlock = {
            type: blockType,
            data: {
                text: 'this is a new block'
            }
        };

        setBlocks([...blocks, newBlock]);
    }

    function togglePopover() {
        setPopoverState(!popoverState);
    }

    return (
        <div>
            <div className='noteheader'>
                <p className='noteheader-title'> {tempData.title} </p>
            </div>

            <div className='notebody'>
                {blocks.map((blockData, _) => {
                    if (blockData.type === 'header') {
                        return <HeaderBlock text={blockData.data.text}/>
                    }
                    else if (blockData.type === 'text') {
                        return <TextBlock text={blockData.data.text}/>
                    }
                    else if (blockData.type === 'image') {
                        return <ImageBlock />
                    } else {
                        // TODO: invalid block element/block
                        console.log('error');
                    }
                })}

            </div>

            <CreateBlock onClick={togglePopover}/>
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