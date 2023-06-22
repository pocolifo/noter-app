import "./contentblock.css"

interface ImageBlockProps {
    src: string;
    alt: string;
}

export default function ImageBlock(props: ImageBlockProps) {
    return (
        <div className="contentblock">
            <img className="image" src={props.src} alt={props.alt} />
        </div>
    )
}