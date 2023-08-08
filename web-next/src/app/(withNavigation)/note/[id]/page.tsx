import NoteEditor from '@/app/components/note/noteeditor/NoteEditor';

export const runtime = 'edge';

export default async function Note({ params }: { params: { id: string } }) {
	return <NoteEditor noteId={params.id} />;
}
