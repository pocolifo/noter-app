import "./contentblock.css"

interface TextBlockProps {
    text: string;
}

export default function TextBlock(props: TextBlockProps) {
    return (
        <div className="contentblock">
            <p className="text">{props.text}</p>
        </div>
    )
}