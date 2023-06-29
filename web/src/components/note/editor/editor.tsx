import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Icon } from '@iconify/react';

import './editor.css';

interface ToolbarProps {
    editor: any;
}

interface ButtonProps {
    id: string;
    icon: string;

    callback: () => void;
}

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
    });

    if (!editor) {
        return null;
    }

    return (
        <div className='editor-wrapper'>
            <Toolbar editor={editor}/>
            <EditorContent className='editor-content' editor={editor}/>
        </div>
    );
}

function Toolbar(props: ToolbarProps) {
    const buttonList: ButtonProps[] = [
        {
            id: 'bold',
            icon: 'fe:bold',
            callback: () => props.editor.chain().focus().toggleBold().run()
        },
        {
            id: 'italic',
            icon: 'fe:italic',
            callback: () => props.editor.chain().focus().toggleItalic().run()
        },
        {
            id: 'strike',
            icon: 'mi:strikethrough',
            callback: () => props.editor.chain().focus().toggleStrike().run()
        },
        {
            id: 'code',
            icon: 'fe:code',
            callback: () => props.editor.chain().focus().toggleCode().run()
        },
    ];

    return (
        <div className='editor-toolbar'>
            {buttonList.map((button, i) => (
                <Icon
                    key={i}
                    icon={button.icon}
                    color='#FFFFFF'
                    onClick={button.callback}
                    className={props.editor.isActive(button.id) ? 'editor-button is-active' : 'editor-button'}
                />
            ))}
        </div>
    );
}