import { useState } from "react";
import contentBlockStyles from "./contentblock.module.css"
import headerBlockStyles from "./headerblock.module.css"

interface HeaderProps {
    text: string;

    save: (content: object) => void;
}

export default function HeaderBlock(props: HeaderProps) {
    let [headerText, setHeaderText] = useState<string>(props.text == undefined ? '' : props.text);

    return (
        <div className={contentBlockStyles.contentBlock}>
            <input
                type='text'
                className={headerBlockStyles.headerBlockHeader}
                placeholder="Section header..."
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                onBlur={(e) => props.save({content: e.target.value})}
            />
        </div>
    )
}