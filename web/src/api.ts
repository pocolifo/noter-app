import { NoteData } from "./interfaces";

// the base api path
export const API = "http://localhost:8000"

export async function getNoteByUUID(uuid: string): Promise<NoteData> {
    try {
        const response = await fetch(`${API}/items/${uuid}`, {credentials: "include"})
        const data = await response.json()

        return Promise.resolve(<NoteData>{
            title: data.name,
            uuid: data.id,
            content: data.blocks
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getNotesByFolder(path: string[]): Promise<NoteData[]> {
    try {
        const response = await fetch(`${API}/items/list`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(path)
        })
        const data = await response.json()

        let notedata: NoteData[] = [];
        for (let note of data) {
            notedata.push({
                title: note.name,
                uuid: note.id,
                content: note.blocks
            });
        }

        return Promise.resolve(notedata)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function createNote(name: string, path: string[]): Promise<NoteData> {
    try {
        const response = await fetch(`${API}/items/create/note`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({
                name: name,
                path: path
            })
        })
        const data = await response.json()

        return Promise.resolve(<NoteData>{
            title: name,
            uuid: data.id,
            content: data.blocks
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function saveNote(note: NoteData): Promise<void> {
    try {
        await fetch(`${API}/items/update/blocks?${new URLSearchParams({id: note.uuid})}`, {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(note.content)
        })

        return Promise.resolve()
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function userLogin(email: string, password: string): Promise<boolean> {
    try {
        // let formData = new FormData();
        // formData.append('email', email);
        // formData.append('password', password);

        const response = await fetch(`${API}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
            credentials: "include"
        });

        const responseJson: {authenticated: boolean} = await response.json();

        return Promise.resolve(responseJson.authenticated);
    } catch (error) {
        return Promise.reject(error);
    }
}