import NoteEditor from '@/app/components/note/noteeditor/NoteEditor';
import { API } from '@/app/lib/api';
import { NoteData } from '@/app/lib/interfaces';
import { headers } from 'next/dist/client/components/headers';

export default async function Note({ params }: { params: { id: string } }) {
	return <NoteEditor noteId={params.id} />;
}