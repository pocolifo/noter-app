import './menus.css'

export default function CreateNewNoteMenu(props: {onsubmit: (value: string) => void}) {
    return (
        <div className='create-new-note'>
            <input
                type="text"
                className='popup-input'
                id='popup-input'
                onKeyDown={(event) => {
                    if (event.key == "Enter")
                        props.onsubmit((event.target as HTMLInputElement).value)
                }}
                placeholder='Name'
                /> 
            <button onClick={
                () => props.onsubmit((document.getElementById('popup-input') as HTMLInputElement).value)
            }>
                Create
            </button>
        </div>
    )
}