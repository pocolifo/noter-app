import parse from 'html-react-parser';
import { useState } from 'react';

import Editor from '../texteditor/texteditor';
import styles from './contentblock.module.css'

interface TextBlockProps {
	text: string;
	focus: boolean;

	save: (content: object) => void;
}

export default function TextBlock(props: TextBlockProps) {
	const [editing, setEditing] = useState(props.focus);
	const [content, setContent] = useState<string>(props.text === undefined ? '' : props.text);

	function saveContent(htmlContent: string) {
		setContent(htmlContent);
		setEditing(false);
		props.save({ content: htmlContent });
	}

	function handleClick() {
		if (!editing && window.getSelection()?.type !== 'Range') {
			setEditing(true);
		}
	}

	return (
		<div className={styles.textContainer} onClick={handleClick}>
			{editing ? (
				<Editor htmlContent={content} closeCallback={saveContent} />
			) : (
				<div style={{ padding: '10px' }}>{parse(content)}</div>
			)}
		</div>
	);
}
