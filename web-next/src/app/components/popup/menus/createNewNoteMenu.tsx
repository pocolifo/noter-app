import { useNavigationContext } from '@/app/components/nav/navcontext';
import LoadingSpinner from '@/app/components/util/LoadingSpinner';
import { createNote } from '@/app/lib/api';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { usePopupContext } from '../popupcontext';
import styles from './menus.module.css';

export default function CreateNewNoteMenu(props: { closePopup: () => void}) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<string | null>(null);
    const router = useRouter();
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
            const createdNote = await createNote(name as string, navState.path.map(path => path.uuid));
            props.closePopup();
            router.push(`/note/${createdNote.uuid}`)
            popupState.stateCallback(null); // stateCallback is loadNotes, no args should be passed
        } catch (e) {
            setErrorState(String(e));
        } finally {
            setCreating(false);
        }
    }

    return (
        <form className={styles.createNewNote} onSubmit={ handleCreateNote }>
            <input type="text" placeholder="Note name" name="name" required />
            
            {errorState && 
                <p className={`${styles.formStatus} ${styles.formStatusError}`}>
                    <Icon style={{width: '100%', height: '100%'}} icon="fe:warning" />
                    <span>{ errorState }</span>
                </p>
            }

            <button disabled={creating} type="submit">
                { creating ? <LoadingSpinner /> : 'Create' }
            </button>
        </form>
    )
}