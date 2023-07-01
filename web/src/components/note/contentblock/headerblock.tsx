import { useState } from "react";
import "./contentblock.css"
import "./headerblock.css"

interface HeaderProps {
    text: string;
}

export default function HeaderBlock(props: HeaderProps) {
    let [ headerText, setHeaderText ] = useState<string>(props.text);

    return (
        <div className="contentblock">
            <input type='text' className="headerblock-header" placeholder="Section header..." value={headerText} onChange={ e => setHeaderText(e.target.value) }/>
        </div>
    )
}