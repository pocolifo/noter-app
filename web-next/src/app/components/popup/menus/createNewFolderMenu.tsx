import { useNavigationContext } from '@/app/components/nav/navcontext';
import { usePopupContext } from '@/app/components/popup/popupcontext';
import LoadingSpinner from '@/app/components/util/LoadingSpinner';
import { createFolder } from '@/app/lib/api';
import { Icon } from '@iconify/react/dist/iconify';
import { useState } from 'react';
import styles from './menus.module.css';

export default function CreateNewFolderMenu(props: { closePopup: () => void }) {
    const [creating, setCreating] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<string | null>(null);
    const popupState = usePopupContext();
    const navState = useNavigationContext();

    async function handleCreateFolder(e: React.FormEvent) {
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
        <form className={styles.createNewNote} onSubmit={handleCreateFolder}>
            <input type="text" placeholder="Folder name" name="name" required />

            {errorState &&
                <p className={`${styles.formStatus} ${styles.formStatusError}`}>
                    <Icon style={{ width: '100%', height: '100%' }} icon="fe:warning" />
                    <span>{errorState}</span>
                </p>
            }

            <button disabled={creating} type="submit">
                {creating ? <LoadingSpinner /> : 'Create'}
            </button>
        </form>
    )
}