import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { Icon } from '@iconify/react';
import { useRef } from 'react';

import ColorPicker from './colorpicker/colorpicker'
import styles from './texteditor.module.css';

interface TextEditorProps {
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

export default function TextEditor(props: TextEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit, TaskList, TaskItem, TextStyle, Color, Highlight.configure({ multicolor: true })],
		content: props.htmlContent
	});
	const isFirstMount = useRef(true);

	if (!editor) {
		return null;
	}

	if (isFirstMount.current) {
		editor?.commands.focus('end');
		isFirstMount.current = false;
	}

	function saveContent() {
		const htmlContent = editor?.getHTML() as string;
		isFirstMount.current = true;
		props.closeCallback(htmlContent);
	}

	return (
		<div>
			<div className={styles.editorWrapper}>
				<Toolbar editor={editor} closeCallback={saveContent} />
				<EditorContent className={styles.editorContent} editor={editor} />
			</div>

			<div className={styles.editorOverlay} onClick={saveContent} />
		</div>
	);
}

function Toolbar(props: ToolbarProps) {
	const buttonList: ButtonProps[] = [
		{
			id: 'undo',
			icon: 'material-symbols:undo',
			callback: () => props.editor.chain().focus().undo().run()
		},
		{
			id: 'redo',
			icon: 'material-symbols:redo',
			callback: () => props.editor.chain().focus().redo().run()
		},
		{
			id: 'divider',
			icon: 'none',
			callback: () => { }
		},
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
			callback: () => { }
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
		{
			id: 'taskList',
			icon: 'fe:list-task',
			callback: () => props.editor.chain().focus().toggleTaskList().run()
		},
		{
			id: 'divider',
			icon: 'none',
			callback: () => { }
		},
		{
			id: 'colorPicker',
			icon: 'fe:text-size',
			callback: () => { }
		},
	];

	return (
		<div className={styles.editorToolbar}>
			{buttonList.map((button, i) => {
				if (button.id === 'divider') {
					return <div className={styles.editorDivider} key={i} />;
				} else if (button.id === 'colorPicker') {
					return <ColorPicker 
						key={i}
						icon={button.icon}
						textColor={props.editor.getAttributes('textStyle').color} 
						bgColor={props.editor.getAttributes('textStyle').highlight}
						setTextColor={(color) => props.editor.chain().focus().setColor(color).run()}
						setBgColor={(color) => props.editor.chain().focus().toggleHighlight({ color: color }).run()}
					/>
				} else {
					return (
						<Icon
							key={i}
							icon={button.icon}
							color="#FFFFFF"
							onClick={button.callback}
							className={
								props.editor.isActive(button.id)
									? `${styles.editorButton} ${styles.isActive}`
									: styles.editorButton
							}
						/>
					);
				}
			})}
		</div>
	);
}
