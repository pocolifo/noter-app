import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import styles from './nav.module.css';
import { useNavigationContext } from "./navcontext";
import { render } from "react-dom";

export default function PathSegmentRenderer() {
    const navState = useNavigationContext();
    let title = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => title.current!.scrollBy({ left: title.current!.scrollWidth, behavior: 'smooth' }), 50); // hack
    }, [navState.path]);

    return (
        <div className={styles.navHeaderTitle} ref={title}>
            { navState.path.length === 0 ? (
                <div>
                    <span>My Notes</span>
                </div>
            ) : (
                navState.path.map((segment, i) => (
                    <div className={styles.segment} onClick={ () => navState.setPath(navState.path.filter((_, i2) => i2 <= i)) } key={segment.uuid}>
                        <span>{segment.title}</span>
                        { navState.path.length-1 !== i && <Icon icon="fe:arrow-right" color="#888888" /> }
                    </div>
                )
            ))}
        </div>
    )
}