import parse from 'html-react-parser';
import { useState } from 'react';

import styles from "./contentblock.module.css";

import Editor from '../texteditor/texteditor';

interface TextBlockProps {
    text: string;
    focus: boolean;

    save: (content: object) => void;
}

export default function TextBlock(props: TextBlockProps) {
    const [editing, setEditing] = useState(props.focus)
    const [content, setContent] = useState<string>(props.text === undefined ? '' : props.text);

    function saveContent(htmlContent: string) {
        setContent(htmlContent);
        setEditing(false);
        props.save({ content: htmlContent })
    }

    function handleClick() {
        if (!editing) {
            setEditing(true);
        }
    }

    return (
        <div
            className={styles.contentBlock}
            onDoubleClick={handleClick}
        >
            {
                (editing)
                    ? <Editor htmlContent={content} closeCallback={saveContent} />
                    : parse(content)
            }
        </div>
    )
}