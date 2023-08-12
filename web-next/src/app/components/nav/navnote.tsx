import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { NavItemProps } from '../../lib/interfaces';
import Popover from '../popover/popover';
import styles from './nav.module.css';

export default function Note(props: NavItemProps) {
	const [showOptions, setShowOptions] = useState(false);
	const params = useParams();

	return (
		<Link href={`/note/${props.uuid}`} className={styles.navItemLink}>
			{/* window.location.pathname is not reactive, make it reactive */}
			<div
				className={`${styles.navItem} ${params.id === props.uuid && styles.navItemActive}`}
			>
				<div className={styles.navItemContent}>
					<Icon icon="fe:book" color="#FFFFFF" />
					<p className={styles.navItemTitle}>{props.title}</p>

					<Icon
						className={styles.navItemOptions}
						icon="fe:elipsis-v"
						color="#FFFFFF"
						onClick={() => setShowOptions(true)}
					/>
				</div>

				{showOptions && (
					<Popover
						title="Actions"
						menu="EditItem"
						align="left"
						data={{}}
						callbacks={{
							input: props.setTitle,
							button: props.delete
						}}
						closeCallback={() => setShowOptions(false)}
					/>
				)}
			</div>
		</Link>
	);
}
