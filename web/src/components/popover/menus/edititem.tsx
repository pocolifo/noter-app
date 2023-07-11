import { PopoverProps } from "../popover";

export default function PopoverEditItem(props: PopoverProps) {
    return (
        <div className="popovermenu-edititem">
            <input placeholder='Edit name' type="text" />

            <button onClick={() => props.buttonCallback()}>Delete Item</button>
        </div>
    )
}