import styles from './nav.module.css'

interface NavProps {
    linkList: {[key: string]: JSX.Element};

    clickCallback: (_v: string) => void;
}

interface NavItemProps {
    link: string;

    clickCallback: (_v: string) => void;
}

export default function Navbar(props: NavProps) {
    return (
        <div className={styles.nav}>
            {
                Object.entries(props.linkList).map(([key, _v]) => (
                    <NavItem link={key} clickCallback={props.clickCallback} key={key} />
                ))
            }
        </div>
    )
}

function NavItem(props: NavItemProps) {
    function handleClick() {
        props.clickCallback(props.link);
    }

    function capitalize(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className={styles.item} onClick={handleClick}>
            <div className={styles.title}> {capitalize(props.link)} </div>
        </div>
    )
}