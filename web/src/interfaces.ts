export interface NavItemProps {
    title: string;
}

export interface PopupProps {
    enabled: boolean,
    title: string,

    stateCallback(v: any): void;
}

export interface NoteData {
    Title: string,
    Content: ContentBlock[]
}

export interface ContentBlock {
    Type: string, // as of the moment this is one of the following: text, image, header, table, vocabulary, diagram
    Data: object
}