import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './createblock.module.css';

interface CreateBlockProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	onDrop: React.DragEventHandler<HTMLButtonElement>;
}

export default function CreateBlock(props: CreateBlockProps) {
	const [droppedStyle, setDroppedStyle] = useState(false);

	return (
		<button
			onDragLeave={() => {
				setDroppedStyle(false);
			}}
			onDragOver={() => {
				setDroppedStyle(true);
			}}
			className={`${droppedStyle && styles.draggedOver} ${styles.createBlock}`}
			onClick={props.onClick}
			onDrop={props.onDrop}
		>
			<span className={styles.text}>
				<Icon icon="fe:plus" color="#202123"></Icon>
				New block or drop media
			</span>
		</button>
	);
}
