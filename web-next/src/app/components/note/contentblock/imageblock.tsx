import { useState } from "react";
import "./contentblock.css"
import "./imageblock.css"
import { Icon } from '@iconify/react'

interface ImageBlockProps {
    src: string;
    alt: string;

    save: (content: object) => void;
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
                        <input id='imageupload' type="file" accept='image/*' style={{ display: 'none' }} onChange={(e) => {
                            let [file] = e.target.files as FileList
                            let reader = new FileReader()
                            reader.onload = () => {
                                setImageSrc(reader.result as string)

                                // `src` must be set to `reader.result as string` because `imageSrc` isn't updated immediately
                                props.save({ src: reader.result as string, alt: imageAlt })
                            }
                            if (file) {
                                reader.readAsDataURL(file)
                            }
                        }} />
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
                    <input
                        className="image-caption"
                        placeholder="Add a caption"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        onBlur={() => props.save({ src: imageSrc, alt: imageAlt })}
                    />
                </div>
            }
        </div>
    )
}