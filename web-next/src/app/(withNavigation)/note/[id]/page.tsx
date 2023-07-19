import NoteEditor from '@/app/components/note/noteeditor/NoteEditor';
import { API } from '@/app/lib/api';
import { NoteData } from '@/app/lib/interfaces';
import { headers } from 'next/dist/client/components/headers';

export default async function Note({ params }: { params: { id: string } }) {
	const response = await fetch(`${API}/items/${params.id}`, {
		headers: headers(),
		next: {
			revalidate: 0
		}
	});

	const data = await response.json();
	let note = {
		title: data.name,
		uuid: data.id,
		content: data.blocks
	} as NoteData;
	
	for (let block of note.content) {
		block.uuid = (Math.random() * 100).toString(16)
	}


	return <NoteEditor note={note} />;
}