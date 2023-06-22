import { useState } from 'react';

import './note.css';

import { NoteData, ContentBlock } from '../../interfaces';
import CreateBlock from '../../components/note/createblock/createblock';
import HeaderBlock from '../../components/note/contentblock/headerblock';
import ImageBlock from '../../components/note/contentblock/imageblock';
import TextBlock from '../../components/note/contentblock/textblock';
import { useParams } from 'react-router-dom';

export default function Note() {
    let { id } = useParams();

    console.log('Selected Note ID', id)

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

    function addBlock(block: ContentBlock) {
        setBlocks(prevState => ([...prevState, block]));
    }

    return (
        <div>
            <div className='noteheader'>
                <p className='noteheader-title'> {tempData.title} </p>
            </div>

            <div className='notebody'>
                {blocks.map((blockData, i) => {
                    switch (blockData.type) {
                        case 'header':
                            return <HeaderBlock text={blockData.data.text} key={i} />
                        
                        case 'text':
                            return <TextBlock text={blockData.data.text} key={i} />
                        
                        case 'image':
                            return <ImageBlock src={blockData.data.src} alt="User generated image" key={i} />
                        
                        default:
                            // TODO: invalid block element/block
                            console.log('error');
                    }
                })}

            </div>

            <CreateBlock />
        </div>
    );
}