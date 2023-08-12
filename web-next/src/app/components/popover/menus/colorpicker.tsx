import { PopoverProps } from "../popover";
import styles from "./colorpicker.module.css"

export default function PopoverColorPicker(props: PopoverProps) {
    return <div className={styles.container}>
		<div className={styles.row}>
			<p>Background</p>
			<input 
				type="color"
				onInput={e => props.callbacks['setBgColor']((e.target as HTMLInputElement).value)}
				value={props.data.bgColor}
            />
        </div>
        <div className={styles.row}>
            <p>Font Color</p>
            <input 
                type="color" 
                onInput={e => props.callbacks['setTextColor']((e.target as HTMLInputElement).value)}
                value={props.data.textColor}
            />
        </div>
    </div>
}