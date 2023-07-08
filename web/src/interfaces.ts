export interface NavItemProps {
    title: string;
    uuid: string; // the UUIDv4 of the relevant note
}

export interface PopupProps {
    enabled: boolean;
    title: string;
    type: string;

    stateCallback(v: any): void;
}

export interface NoteData {
    title: string,
    uuid: string,
    content: ContentBlock[]
}

export interface ContentBlock {
    type: string, // as of the moment this is one of the following: text, image, header, table, vocabulary, diagram
    data: any;
}