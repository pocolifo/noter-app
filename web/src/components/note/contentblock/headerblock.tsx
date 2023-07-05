import { useState } from "react";
import "./contentblock.css"
import "./headerblock.css"

interface HeaderProps {
    text: string;

    save: (content: object) => void;
}

export default function HeaderBlock(props: HeaderProps) {
    let [headerText, setHeaderText] = useState<string>(props.text == undefined ? '' : props.text);

    return (
        <div className="contentblock">
            <input
                type='text'
                className="headerblock-header"
                placeholder="Section header..."
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                onBlur={(e) => props.save({content: e.target.value})}
            />
        </div>
    )
}