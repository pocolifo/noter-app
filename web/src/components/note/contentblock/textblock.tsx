import { useState } from 'react';
import parse from 'html-react-parser';

import "./contentblock.css";

import Editor from '../editor/editor';

interface TextBlockProps {
    text: string;
}

export default function TextBlock(props: TextBlockProps) {
    const [editing, setEditing] = useState(true);
    const [content, setContent] = useState<string>('');

    function saveContent(htmlContent: string) {
        setContent(htmlContent);
        setEditing(false);
    }

    function handleClick() {
        if (!editing) {
            setEditing(true);
        }
    }

    return (
        <div 
        className={editing ? 'contentblock' : 'contentblock contentblock-border'} 
        onClick={handleClick}>
            {
                (editing)
                ? <Editor htmlContent={content} closeCallback={saveContent}/>
                : parse(content)
            }
        </div>
    )
}