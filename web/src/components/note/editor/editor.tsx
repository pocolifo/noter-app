import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Icon } from '@iconify/react';

import './editor.css';

interface EditorProps {
    htmlContent: string;

    closeCallback: (_content: string) => void;
}

interface ToolbarProps {
    editor: any;

    closeCallback: () => void;
}

interface ButtonProps {
    id: string;
    icon: string;

    callback: () => void;
}

export default function Editor(props: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: props.htmlContent
    });

    if (!editor) {
        return null;
    }

    function saveContent() {
        const htmlContent = editor.getHTML();
        props.closeCallback(htmlContent);
    }

    return (
        <div>
            <div className='editor-wrapper'>
                <Toolbar editor={editor} closeCallback={saveContent}/>
                <EditorContent className='editor-content' editor={editor}/>
            </div>
            <div className='editor-overlay' onClick={saveContent}/>
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
            id: 'codeBlock',
            icon: 'fe:code',
            callback: () => props.editor.chain().focus().toggleCodeBlock().run()
        },
        {
            id: 'divider',
            icon: 'none',
            callback: () => {}
        },
        {
            id: 'bulletList',
            icon: 'fe:list-bullet',
            callback: () => props.editor.chain().focus().toggleBulletList().run()
        },
        {
            id: 'orderedList',
            icon: 'fe:list-order',
            callback: () => props.editor.chain().focus().toggleOrderedList().run()
        },
    ];

    return (
        <div className='editor-toolbar'>
            {buttonList.map((button, i) => {
                if (button.id === 'divider') {
                    return <div className='editor-divider'/>
                } else {
                    return <Icon
                        key={i}
                        icon={button.icon}
                        color='#FFFFFF'
                        onClick={button.callback}
                        className={props.editor.isActive(button.id) ? 'editor-button is-active' : 'editor-button'}
                    />
                }
            })}

            <Icon
                icon='fe:close'
                color='#FFFFFF'
                onClick={props.closeCallback}
                className='editor-closebutton'
            />
        </div>
    );
}