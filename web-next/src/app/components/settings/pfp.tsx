import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Icon } from '@iconify/react';

import styles from './pfp.module.css';

import { useUserDataContext } from '@/app/settings/userdatacontext';

interface PfpProps {
	header: string;

	value: string;
	callback: (_v: string) => void;
}

export default function Pfp(props: PfpProps) {
	const pfp = useUserDataContext().pfp;
	const inputFile = useRef<HTMLInputElement | null>(null);

	function openSelector() {
		if (inputFile !== null) {
			inputFile.current!.click();
		}
	}

	function changeImage(event: ChangeEvent<HTMLInputElement>) {
		const files = event.target.files as FileList;
		const file = files.item(0);
		const reader = new FileReader();

		reader.onload = () => {
			props.callback(reader.result as string);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	return (
		<div onClick={openSelector} className={styles.pfpButton}>
			<img src={pfp} alt="User profile picture" className={styles.pfp} />
			
			<input
				type="file"
				accept="image/*"
				id="pfpupload"
				style={{ display: 'none' }}
				ref={inputFile}
				onChange={changeImage}
			/>

			<Icon icon="fe:edit" className={styles.pfpIcon} color="#FFFFFF" />
		</div>
	);
}
