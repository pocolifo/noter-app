import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { createFolder } from '../../../lib/api';
import LoadingSpinner from '../../util/LoadingSpinner';
import { usePopupContext } from '../popupcontext';
import { useNavigationContext } from '../../nav/navcontext';
import './menus.css';

export default function CreateNewNoteMenu(props: { closePopup: () => void}) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<string | null>(null);
    const popupState = usePopupContext();
    const navState = useNavigationContext();

    async function handleCreateNote(e: React.FormEvent) {
        setCreating(true);
        e.preventDefault();
        let target = e.currentTarget as HTMLFormElement;
        let formData = new FormData(target);

        let name = formData.get('name');
        if (name === null) {
            setErrorState('Missing name');
            setCreating(false);
            return;
        }

        try {
            await createFolder(name as string, navState.path.map(path => path.uuid));
            props.closePopup();
            popupState.stateCallback(null); // stateCallback is loadNotes, no args should be passed
        } catch (e) {
            setErrorState(String(e));
        } finally {
            setCreating(false);
        }
    }

    return (
        <form className='create-new-note' onSubmit={ handleCreateNote }>
            <input type="text" placeholder="Folder name" name="name" required />
            
            {errorState && 
                <p className='form-status form-status-error'>
                    <Icon icon="fe:warning" />
                    <span>{ errorState }</span>
                </p>
            }

            <button disabled={creating} type="submit">
                { creating ? <LoadingSpinner /> : 'Create' }
            </button>
        </form>
    )
}