import { FolderData, NoteData, QuizQuestion, UserData } from './interfaces';

// the base api path
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getNoteByUUID(uuid: string): Promise<NoteData> {
	try {
		const response = await fetch(`${API}/items/${uuid}`, { credentials: 'include' });
		const data = await response.json();

		return Promise.resolve(<NoteData>{
			title: data.name,
			uuid: data.id,
			content: data.blocks
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getItemsByFolder(path: string[]): Promise<(NoteData | FolderData)[]> {
	try {
		const response = await fetch(`${API}/items/list`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(path)
		});
		const data = await response.json();

		let itemdata: (NoteData | FolderData)[] = [];
		for (let item of data) {
			if (item.type === 'note') {
				itemdata.push({
					type: item.type,
					title: item.name,
					uuid: item.id,
					content: item.blocks
				});
			} else if (item.type === 'folder') {
				itemdata.push({
					type: item.type,
					title: item.name,
					uuid: item.id
				});
			}
		}

		return Promise.resolve(itemdata);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function createFolder(name: string, path: string[]): Promise<FolderData> {
	try {
		const response = await fetch(`${API}/items/create/folder`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				name: name,
				path: path
			})
		});
		const data = await response.json();

		return Promise.resolve(<FolderData>{
			type: 'folder',
			title: name,
			uuid: data.id
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function createNote(name: string, path: string[]): Promise<NoteData> {
	try {
		const response = await fetch(`${API}/items/create/note`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				name: name,
				path: path
			})
		});
		const data = await response.json();

		return Promise.resolve(<NoteData>{
			type: 'note',
			title: name,
			uuid: data.id,
			content: data.blocks
		});
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function saveNote(note: NoteData): Promise<void> {
	try {
		await fetch(`${API}/items/update/blocks?${new URLSearchParams({ id: note.uuid })}`, {
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify(note.content)
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function userLogin(email: string, password: string): Promise<boolean> {
	try {
		const response = await fetch(`${API}/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			}),
			credentials: 'include'
		});

		const responseJson: { authenticated: boolean } = await response.json();

		return Promise.resolve(responseJson.authenticated);
	} catch (error) {
		return Promise.reject(error);
	}
}

// check if the user is logged in
export async function authenticate(): Promise<boolean> {
	try {
		const response = await fetch(`${API}/`, {
			credentials: 'include'
		});

		const responseJson = await response.json();

		return Promise.resolve(responseJson.user !== null);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getUserData(): Promise<UserData> {
	try {
		const response = await fetch(`${API}/`, {
			credentials: 'include'
		});

		const responseJson = await response.json();

		if (responseJson.user === null) {
			throw new Error('No user found, probably not authenticated');
		}

		const userData: UserData = {
			name: responseJson.name,
			pfp: responseJson.pfp,
			email: responseJson.email
		};

		return Promise.resolve(userData);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function changeName(name: string): Promise<void> {
	try {
		await fetch(`${API}/items/update/name`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				name: name
			})
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function changePfp(pfp: string): Promise<void> {
	try {
		await fetch(`${API}/items/update/pfp`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				image: pfp
			})
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function changeEmail(email: string): Promise<void> {
	// TBI
}

export async function requestChangePassword(): Promise<void> {
	try {
		await fetch(`${API}/items/update/reqpassword`, {
			credentials: 'include',
			method: 'POST'
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function changePassword(password: string, code: string): Promise<void> {
	try {
		await fetch(`${API}/items/update/password`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				password: password,
				code: code
			})
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function updateItem(id: string, name: string, path: string[]): Promise<void> {
	try {
		await fetch(`${API}/items/update/metadata?${new URLSearchParams({ id: id })}`, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				name: name,
				path: path
			})
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function deleteItem(id: string): Promise<void> {
	try {
		await fetch(`${API}/items/delete?${new URLSearchParams({ id: id })}`, {
			credentials: 'include',
			method: 'DELETE'
		});

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function summarizeNote(id: string): Promise<any> {
	try {
		const response = await fetch(
			`${API}/ai/generate/summary?${new URLSearchParams({ id: id })}`,
			{
				credentials: 'include',
				method: 'POST'
			}
		);
		const data = await response.json();

		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function generateQuiz(id: string, n: number): Promise<QuizQuestion[]> {
	try {
		const response = await fetch(
			`${API}/ai/generate/quiz?${new URLSearchParams({ id: id, n: n.toString() })}`,
			{
				credentials: 'include',
				method: 'POST'
			}
		);
		const data = (await response.json()) as Array<any>;

		return Promise.resolve(
			data.map((d) => {
				return {
					question: d.question,
					options: d.options,
					correct: Number(d.correct)
				};
			})
		);
	} catch (error) {
		return Promise.reject(error);
	}
}
