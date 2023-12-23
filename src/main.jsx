import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from './routes/contact';
import Root, {
	loader as rootLoader,
	action as rootAction,
} from './routes/root';
import { loader as contactLoader } from './routes/contact';
import './index.css';
import EditContact from './routes/edit';
import {action as editAction} from './routes/edit'
// import DeleteContact from './routes/destroy'
import {action as deleteAction} from './routes/destroy'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
				loader: contactLoader,
			},
			{
				path: 'contacts/:contactId/edit',
				element: <EditContact />,
				loader: contactLoader,
        action: editAction
			},
      {
        path: 'contacts/:contactId/destroy',
        // element: <DeleteContact />,
        action: deleteAction,
        errorElement:  <div>Oops! There was an error.</div>,
      }
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
