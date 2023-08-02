import { useState } from 'react';
import { PopoverProps } from '../popover';

import styles from './edititem.module.css';

export default function PopoverEditItem(props: PopoverProps) {
	const [name, setName] = useState('');

	return (
		<div className={styles.editItem}>
			<input
				placeholder="Edit name"
				type="text"
				onChange={(e) => setName(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						props.inputCallback(name);
						props.closeCallback();
					} else if (e.key === 'Esc') {
						props.closeCallback();
					}
				}}
			/>

			<button
				className={styles.saveButton}
				onClick={() => {
					props.inputCallback(name);
					props.closeCallback();
				}}
			>
				Save Name
			</button>

			<button className={styles.deleteButton} onClick={props.buttonCallback}>
				Delete Item
			</button>
		</div>
	);
}
