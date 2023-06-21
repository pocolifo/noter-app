export interface NavItemProps {
    title: string;
}

export interface PopupProps {
    enabled: boolean,
    title: string,

    stateCallback(v: any): void;
}