import { useRef, useState } from "react";
import "./contentblock.css"
import { Icon } from '@iconify/react'

interface ImageBlockProps {
    src: string;
    alt: string;
}

export default function ImageBlock(props: ImageBlockProps) {
    const [imageSrc, setImageSrc] = useState(props.src)
    const [imageAlt, setImageAlt] = useState(props.alt)

    const [isLarge, setIsLarge] = useState(false)

    const inputElement = useRef<HTMLInputElement>(null)

    return (
        <div className="contentblock">
            {imageSrc == undefined ?
                <div className="select-image">
                    <label htmlFor="imageupload">
                        <input id='imageupload' type="file" accept='image/*' ref={inputElement} style={{display: 'none'}} onChange={() => {
                            let [file] = inputElement.current?.files as FileList
                            let reader = new FileReader()
                            reader.onload = () => {
                                setImageSrc(reader.result as string)
                            }
                            if (file) {
                                reader.readAsDataURL(file)
                            }
                        }}/>
                        <Icon 
                            icon='fe:picture'
                            color="#000000"
                            className="select-image-icon"
                        />
                        Select Image
                    </label>
                </div>
            :
                <img className={isLarge ? 'image large' : 'image'} src={imageSrc} alt={imageAlt} onClick={() => setIsLarge(!isLarge)} />
            }
        </div>
    )
}