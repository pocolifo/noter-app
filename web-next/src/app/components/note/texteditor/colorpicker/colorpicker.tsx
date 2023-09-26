import { Icon } from "@iconify/react"
import styles from "../texteditor.module.css"
import Popover from "@/app/components/popover/popover"
import { useState } from "react"

export default function ColorPicker(props: {
    icon: string,
    bgColor: string,
    textColor: string,
    setBgColor: (_v: string) => void,
    setTextColor: (_v: string) => void,
}) {
    const [showMenu, setShowMenu] = useState(false);

    return <>
        <Icon 
            icon={props.icon}
            className={styles.editorButton}
            color={props.textColor}
            style={{backgroundColor: props.bgColor}}
            onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && <Popover 
            title="Text"
            menu="ColorPicker"
            align="bottom"
            data={{
                bgColor: props.bgColor,
                textColor: props.textColor
            }}
            callbacks={{
                setBgColor: props.setBgColor,
                setTextColor: props.setTextColor
            }}
            closeCallback={() => setShowMenu(false)}
        />}
    </>
}