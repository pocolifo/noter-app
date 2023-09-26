import { PopoverProps } from "../popover";
import styles from "./colorpicker.module.css"

function convertCssRgbToHex(s: string) {
    return '#' + s.replace('rgb(', '').replace(')', '').split(',').map((str, i) => Number(str).toString(16)).map(s => s.length == 1 ? '0' + s : s).join('');
}

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
                value={convertCssRgbToHex(props.data.textColor)}
            />
        </div>
    </div>
}