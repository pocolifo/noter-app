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

// so we can show the user the name but store the UUID for the API
export interface PathSegment {
	title: string;
	uuid: string;
}

export interface FolderData {
	type: string; // so we dont have to do reflection for navbar data
	title: string;
	uuid: string;
}

export interface NoteData {
	type: string;
	title: string;
	uuid: string;
	content: ContentBlock[];
}

export interface ContentBlock {
	type: 'header' | 'text' | 'image' | 'summary' | 'quiz';
	uuid: string;
	data: any;
}

export interface UserData {
	name: string;
	pfp: string;
	email: string;
}

export interface NotificationProps {
	title: string;
	description: string;
	type: 'error' | 'success' | 'alert';
}

export interface QuizQuestion {
	question: string;
	options: string[];
	correct: number;
}
