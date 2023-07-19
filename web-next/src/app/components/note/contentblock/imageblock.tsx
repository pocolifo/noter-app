import { useState } from "react";
import { Icon } from '@iconify/react'

import styles from "./contentblock.module.css";

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
        <div className={styles.contentBlock}>
            {imageSrc == undefined ?
                <div className={styles.selectImage}>
                    <label htmlFor="imageupload">Select Image</label>

                    <input id='imageupload' type="file" accept='image/*' style={{ display: 'none' }} onChange={(e) => {
                        const files = e.target.files as FileList;
                        const file = files.item(0);
                        const reader = new FileReader();
                        
                        reader.onload = () => {
                            setImageSrc(reader.result as string);

                            // `src` must be set to `reader.result as string` because `imageSrc` isn't updated immediately
                            props.save({ src: reader.result as string, alt: imageAlt });
                        };

                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }} />
                    
                    <Icon
                        icon='fe:picture'
                        color="#000000"
                    />
                </div>
                :
                <div className={`${styles.imageContainer} ${isLarge && styles.large}`}>
                    <img src={imageSrc} alt={imageAlt} onClick={() => setIsLarge(!isLarge)} />

                    <input
                        className={styles.imageCaption}
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