import "./contentblock.css"

export default function HeaderBlock(text: string) {
    return (
        <div className="contentblock">
            <h1 className="header">{text}</h1>
        </div>
    )
}