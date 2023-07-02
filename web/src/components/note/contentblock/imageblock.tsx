import { useState } from "react";
import "./contentblock.css"
import "./imageblock.css"
import { Icon } from '@iconify/react'

interface ImageBlockProps {
    src: string;
    alt: string;
}

export default function ImageBlock(props: ImageBlockProps) {
    const [imageSrc, setImageSrc] = useState(props.src)
    const [imageAlt, setImageAlt] = useState(props.alt)

    const [isLarge, setIsLarge] = useState(false)

    return (
        <div className="contentblock contentblock-border">
            {imageSrc == undefined ?
                <div className="select-image">
                    <label htmlFor="imageupload">
                        <input id='imageupload' type="file" accept='image/*' style={{display: 'none'}} onChange={(e) => {
                            let [file] = e.target.files as FileList
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
                <div className={isLarge ? 'image-container large' : 'image-container'}>
                    <img className='image' src={imageSrc} alt={imageAlt} onClick={() => setIsLarge(!isLarge)} />
                    <input className="image-caption" placeholder="Add a caption" onChange={(e) => setImageAlt(e.target.value)} />
                </div>
            }
        </div>
    )
}