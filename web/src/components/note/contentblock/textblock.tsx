import { useState } from 'react';

import "./contentblock.css";

import Editor from '../editor/editor';

interface TextBlockProps {
    text: string;
}

export default function TextBlock(props: TextBlockProps) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.text);

    function toggleEditing() {
        setEditing(!editing);
    }

    return (
        <div className="contentblock" onClick={() => {}}>
            {
                (editing)
                ? <Editor text={'test'} setText={setText}/>
                : <p> {text} </p>
            }
        </div>
    )
}