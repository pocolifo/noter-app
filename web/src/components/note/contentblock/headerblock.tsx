import "./contentblock.css"

interface HeaderProps {
    text: string;
}

export default function HeaderBlock(props: HeaderProps) {
    return (
        <div className="contentblock">
            <h1 className="header">{props.text}</h1>
        </div>
    )
}