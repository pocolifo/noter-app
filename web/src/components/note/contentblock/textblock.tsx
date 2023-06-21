import "./contentblock.css"

export default function TextBlock(text: string) {
    return (
        <div className="contentblock">
            <p className="text">{text}</p>
        </div>
    )
}