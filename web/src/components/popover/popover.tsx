import PopoverCreateNew from './menus/createnew';
import PopoverEditItem from './menus/edititem';

import './popover.css';


export interface PopoverProps {
    title: string;

    // name of menu to render (at the moment is CreateNew or EditItem)
    menu: "CreateNew" | "EditItem";

    // where the arrow is relative to the popover body
    align: 'top' | 'right' | 'bottom' | 'left';
    
    inputCallback: (_v: string) => void;
    buttonCallback: () => void;
    closeCallback: () => void;
}


export default function Popover(props: PopoverProps) {
    let popoverBody = <></>

    switch (props.menu) {
        case "CreateNew":
            popoverBody = <PopoverCreateNew {...props} />
            break;

        case 'EditItem':
            popoverBody = <PopoverEditItem {...props} />
            break;
    
        default:
            popoverBody = <></>
            break;
    }

    return (
        <>
            <div className='popover-overlay' onClick={props.closeCallback} />
            <div className={`popover-main popover-${props.align}`}>
                <p className='popover-title'> {props.title} </p>

                <div className='popover-section'>
                    { popoverBody }
                </div>
            </div>
        </>
    );
}

