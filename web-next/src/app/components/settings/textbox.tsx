import { ChangeEvent, useEffect, useState } from 'react';

import styles from '@/app/settings/profile/page.module.css';

import { useUserDataContext } from '@/app/settings/userdatacontext';
import { Icon } from '@iconify/react';

interface TextboxProps {
	header: string;
	valueSetter: (value: string) => void;

	value: string;
	callback: (_v: string) => void;

	editCallback?: any;
}

export default function Textbox(props: TextboxProps) {
	const userDataContext = useUserDataContext();
	const [editing, setEditing] = useState(false);
	const [inputValue, setInputValue] = useState<string>('');

	function toggleEditing() {
		setEditing(!editing);
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	function editCallback() {
		if (typeof props.editCallback === 'function') {
			props.editCallback();
		} else {
			toggleEditing();
		}
	}

	return (
		<div className={styles.textbox}>
			<p> {props.header} </p>

			{editing ? (
				<div className={styles.side}>
					<input
						type="text"
						className={styles.input}
						defaultValue={props.value}
						onChange={handleChange}
					/>

					<Icon
						icon='fe:check'
						className={styles.textIcon}
						onClick={() => {
							if (inputValue === '') {
								props.callback(props.value)
							} else {
								props.callback(inputValue);
							}

							toggleEditing();
						}}
					/>
				</div>
			) : (
				<div className={styles.side}>
					<p> {props.value} </p>

					<Icon
						icon='fe:edit'
						className={styles.textIcon}
						onClick={() => {
							editCallback();
						}}
					/>
				</div>
			)}
		</div>
	);
}
