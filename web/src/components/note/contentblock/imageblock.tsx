import "./contentblock.css"

export default function ImageBlock(src: string, alt: string) {
    return (
        <div className="contentblock">
            <img className="image" src={src} alt={alt} />
        </div>
    )
}