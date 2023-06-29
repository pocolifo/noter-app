import { useState } from 'react';

import "./contentblock.css";

import Editor from '../editor/editor';

interface TextBlockProps {
    text: string;
}

export default function TextBlock(props: TextBlockProps) {
    const [editing, setEditing] = useState(true);
    const [text, setText] = useState(props.text);

    function toggleEditing() {
        setEditing(!editing);
    }

    function handleClick() {
        
    }

    return (
        <div className="contentblock" onClick={() => {}}>
            {
                (editing)
                ? <Editor/>
                //? <Editor text={'test'} setText={setText}/>
                : <p onClick={handleClick}> {text} </p>
            }
        </div>
    )
}