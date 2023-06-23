import { useRef } from 'react';

import './editor.css'

interface EditorProps {
    text: string;
    setText: (_v: string) => void;
}

export default function Editor(props: EditorProps) {
    // const textArea = document.getElementById('editor-textarea');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function autoResize() {
        // ta.style.height = 'auto';
        // ta.style.height = ta.scrollHeight + 'px';

        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight + 'px';

            console.log(textArea.scrollHeight)
        }
    }

    return (
        <div className='editor-main'>
            <textarea 
                id='editor-textarea'
                onInput={autoResize}
                ref={textAreaRef}
                defaultValue={props.text}
            />
        </div>
    );
}