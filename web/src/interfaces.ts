export interface NavItemProps {
    type: string;
    title: string;
    uuid: string; // the UUIDv4 of the relevant note

    setTitle: (title: string) => void;
    delete: () => void;
}

export interface PopupProps {
    enabled: boolean;
    title: string;
    type: string;

    stateCallback(v: any): void;
}

export interface FolderData {
    type: string;
    title: string;
    uuid: string;
    path: string;
}

export interface NoteData {
    type: string;
    title: string;
    uuid: string;
    content: ContentBlock[];
}

export interface ContentBlock {
    type: string; // as of the moment this is one of the following: text, image, header, table, vocabulary, diagram
    data: any;
}