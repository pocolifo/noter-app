export interface NavItemProps {
    title: string;
}

export interface PopupProps {
    enabled: boolean,
    title: string,

    stateCallback(v: any): void;
}

export interface NoteData {
    title: string,
    content: ContentBlock[]
}

export interface ContentBlock {
    type: string, // as of the moment this is one of the following: text, image, header, table, vocabulary, diagram
    data: any
}