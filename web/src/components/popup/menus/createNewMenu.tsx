import { Icon } from '@iconify/react';

import './menus.css'

interface CreateNewMenuProps {
    studyguideaction: () => void;
    noteaction: () => void;
    folderaction: () => void;
}

export default function CreateNewMenu(props: CreateNewMenuProps) {

    return (
        <div className="create-new">
            <div>
                <button 
                    onClick={() => props.studyguideaction()}
                    style={{backgroundColor: '#F472B6'}}
                    >
                    <Icon icon="fe:document" color='#FFFFFF'/>
                </button>
                <p>Study Guide</p>
            </div>

            <div>
                <button
                    onClick={() => props.noteaction()}
                    style={{backgroundColor: '#C084FC'}}
                    >
                    <Icon icon="fe:book" color='#FFFFFF'/>
                </button>
                <p>Note</p>
            </div>

            <div>
                <button
                    onClick={() => props.folderaction()}
                    style={{backgroundColor: '#60A5FA'}}
                    >
                    <Icon icon="fe:folder" color='#FFFFFF'/>
                </button>
                <p>Folder</p>
            </div>
        </div>
    )
}