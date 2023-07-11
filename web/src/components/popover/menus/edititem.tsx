import { useState } from "react";
import { PopoverProps } from "../popover";

export default function PopoverEditItem(props: PopoverProps) {
    const [name, setName] = useState('')

    return (
        <div className="popovermenu-edititem">
            <input 
                placeholder='Edit name' 
                type="text" 
                onChange={e => setName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        props.inputCallback(name)
                        props.closeCallback()
                    } else if (e.key === 'Esc') {
                        props.closeCallback()
                    }
                }}
                />

            <button className='save-name' onClick={() => {
                props.inputCallback(name)
                props.closeCallback()
            }}>Save Name</button>
            <button className='delete-item' onClick={() => {
                props.buttonCallback()
            }}>Delete Item</button>
        </div>
    )
}