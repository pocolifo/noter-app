import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './routes/app/App'
import Note from './routes/note/note'
import Login from './routes/login/login'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'note/:id',
				element: <Note />
			}
		]
	},
	{
		path: '/login',
		element: <Login/>
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
)
