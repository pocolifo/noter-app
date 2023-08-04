import PopoverCreateNew from './menus/createnew';
import PopoverEditItem from './menus/edititem';

import { Icon } from '@iconify/react';

import styles from './popover.module.css';

export interface PopoverProps {
	title: string;

	// name of menu to render (at the moment is CreateNew or EditItem)
	menu: 'CreateNew' | 'EditItem';

	// where the arrow is relative to the popover body
	align: 'top' | 'left';

	inputCallback: (_v: string) => void;
	buttonCallback: () => void;
	closeCallback: () => void;
}

export default function Popover(props: PopoverProps) {
	let popoverBody = <></>;

	switch (props.menu) {
		case 'CreateNew':
			popoverBody = <PopoverCreateNew {...props} />;
			break;

		case 'EditItem':
			popoverBody = <PopoverEditItem {...props} />;
			break;

		default:
			popoverBody = <></>;
			break;
	}

	const alignStyle = {
		top: styles.top,
		left: styles.left
	};

	return (
		<>
			<div className={styles.overlay} onClick={props.closeCallback} />
			<div className={`${styles.main} ${alignStyle[props.align]}`}>
				<p className={styles.title}>
					<span>{props.title}</span>

					<Icon
						className={styles.close}
						icon="fe:close"
						color="#FFFFFF"
						onClick={() => props.closeCallback()}
					/>
				</p>

				<div className={styles.section}>{popoverBody}</div>
			</div>
		</>
	);
}
