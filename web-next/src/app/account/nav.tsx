import styles from './nav.module.css'

interface NavProps {
    linkList: any; // too lazy to type in actual typename

    clickCallback: (_v: string) => void;
}

interface NavItemProps {
    link: string;

    clickCallback: (_v: string) => void;
}

export default function Navbar(props: NavProps) {
    return (
        <div className={styles.nav}>
            {props.linkList.map((item, i) => ( // cant map list of key-value pairs
                <NavItem link={item} clickCallback={props.clickCallback}/>
            ))}
        </div>
    )
}

function NavItem(props: NavItemProps) {
    function handleClick() {
        props.clickCallback(props.link);
    }

    return (
        <div className={styles.item} onClick={handleClick}>

        </div>
    )
}