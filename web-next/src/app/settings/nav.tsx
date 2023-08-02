import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

import styles from './nav.module.css';

interface NavProps {
	linkList: NavItemProps[];
}

interface NavItemProps {
	title: string;
	route: string;
}

export default function Navbar(props: NavProps) {
	return (
		<div className={styles.nav}>
			<div className={styles.navheader}>
				<Link href={'/'} className={styles.link}>
					<Icon icon="fe:arrow-left" className={styles.navbutton} color="#FFFFFF" />
				</Link>

				<p className={styles.navtitle}> Settings </p>
			</div>

			{props.linkList.map((data, i) => {
				return <NavItem title={data.title} route={data.route} key={i} />;
			})}
		</div>
	);
}

function NavItem(props: NavItemProps) {
	const path = usePathname();
	const [active, setActive] = useState<boolean>(false);

	useEffect(() => {
		const current = path.substring(path.lastIndexOf('/') + 1);

		setActive(current === props.route);
	}, [path]);

	return (
		<Link href={props.route} className={styles.link}>
			<div className={`${styles.item} ${active && styles.active}`}>
				<div className={styles.title}> {props.title} </div>
			</div>
		</Link>
	);
}
